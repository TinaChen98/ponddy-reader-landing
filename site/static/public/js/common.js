var activeCode = ''
var lastActiveCode = ''
var token = localStorage.getItem("token")

$(document).ready(function () {
    setDefaultLanguage()
    setAuthLink()
    setContentRedirect()
    setDefaultOpenRedeem()
    setScrollTopButton()
    setMenuDisplay()
    // browserLanguage()

    var lazyLoadInstance = new LazyLoad({
        threshold: 0,
        elements_selector: 'section, a, img'
    });

    $('#redeemModal .modal-body  input').keyup(function () {
        activeCode = ''
        // $(this).val($(this).val().toUpperCase())
        $('#redeemModal .modal-body  input').each(function () {
            activeCode += '-' + $(this).val()
        })
        activeCode = activeCode.substring(1, activeCode.length)

        if (lastActiveCode !== activeCode) {
            lastActiveCode = activeCode

            if (activeCode.length < 19) {
                $('.modal-footer button').prop('disabled', true)
            } else {
                localStorage.setItem('activeCode', activeCode)
                if (token) {
                    verifyActiveCode(false)
                }
            }
        }

        if (this.value.length == this.maxLength) {
            $(this).parent().next().find('#redeemModal .modal-body  input').focus()
        }
    })

    document.querySelector("input").addEventListener("paste", function (e) {
        e.preventDefault()
        var pastedText = e.clipboardData.getData("text/plain")
        pastedText = pastedText.replace(/[^a-zA-Z0-9]+/g, "");

        if (pastedText.includes("-")) {
            var codeArray = pastedText.split('-')
            $('#redeemModal .modal-body  input').each(function (index, value) {
                if (codeArray[index]) {
                    $(this).val(codeArray[index])
                    $(this).parent().next().find('#redeemModal .modal-body  input').focus()
                    if (index === 0) {
                        activeCode = $(this).val()
                    } else {
                        activeCode += '-' + $(this).val()
                    }
                    localStorage.setItem('activeCode', activeCode)
                }
            })
        } else if (pastedText.length > 4) {
            for (var i = 0; i < 4; i++) {
                if (pastedText.length > i * 4) {
                    // console.log($('#redeemModal .modal-body  input'))
                    $('#redeemModal .modal-body  input')[i].value = pastedText.substring(i * 4, (i + 1) * 4)
                    document.getElementById('code-' + (i + 1)).focus();
                } else {
                    $('#redeemModal .modal-body  input')[i].value = (pastedText.substring(i * 4, pastedText.length))
                    break
                }
            }
        }


    })

    $('#redeem').click(function () {
        verifyActiveCode(true)
    })

    $('#redeemModal').on('hide.bs.modal', function (e) {
        localStorage.removeItem('activeCode')
    })
})

function clickLanguage(lang, itemUrl){
    if(lang == 'en') {
        if(itemUrl != '') {
            location.href = '/' + itemUrl + '/' + location.hash
        } else {
            location.href = '/'
        }
    } if(lang == 'zh-tw') {
        if(itemUrl != '') {
            location.href = '/tw/' + itemUrl + '/' + location.hash
        } else {
            location.href = '/tw/'
        }
    } else if(lang == 'zh') {
        if(itemUrl != '') {
            location.href = '/cn/' + itemUrl + '/' + location.hash
        } else {
            location.href = '/cn/'
        }
    } else if(lang != 'en'){
        if(itemUrl != '') {
            location.href = '/' + lang + '/' + itemUrl + '/' + location.hash
        } else {
            location.href = '/' + lang + '/' + location.hash
        }
    }
    localStorage.setItem("lang", lang)
}

function changeHeader(itemUrl) {
    var lg = ['tw', 'cn', 'ja', 'th', 'id']
    if(lg.indexOf(location.href.split('/')[3])!=-1) {
        location.href = '/'+location.href.split('/')[3]+itemUrl
    } else {
        location.href = itemUrl
    }
}

function browserLanguage() {
    if(location.hash != '#lg' && location.href.indexOf('resources')==-1){
        url = location.href.split("/")
        newUrl = ''

        if(url[3]!='cn') {
            for(var x=0;x<=url.length-1;x++) {
                if(x == 3) {
                    newUrl += 'cn/'
                } else if(x==url.length-1){
                    if(url[x]!=''){
                        newUrl += url[x]+ '/'
                    }
                } else {
                    newUrl += url[x]+ '/'
                }
            }
        }
        location.href = newUrl+'#lg'
    }

    // 依照瀏覽器切換語言
    // var language = ['zh-TW', 'zh-CN', 'ja', 'th', 'id'];
    // var url = ['tw', 'cn', 'ja', 'th', 'id']
    // var page = ['for_teachers', 'for_learners', 'for_institutions', 'pricing', 'resources']
    // if(location.hash != '#lg' && location.href.indexOf('resources')==-1){
    //     language.forEach(function(item, x) {
    //         if(navigator.language.toUpperCase() === item.toUpperCase()) {
    //             if(location.href.indexOf(url[x])==-1) {
    //                 var nowPage = location.href.split('/')[location.href.split('/').length - 2]
    //                 var nowUrl = ''
    //                 page.forEach(function(item1, y) {
    //                     if(nowPage == item1) {
    //                         nowUrl = '/'+url[1]+'/'+nowPage+'/'
    //                     }
    //                 });
    //                 if(nowUrl) {
    //                     location.href = nowUrl+'#lg'
    //                 } else {
    //                     location.href = '/'+url[1]+'/#lg'
    //                 }
    //             }
    //         }
    //     });
    // }
}

function setDefaultOpenRedeem() {
    if (getParameterByName('redeem') === 'true') {
        $('#redeemModal').modal({
            show: true
        });
        var uri = window.location.toString();
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"))
            window.history.replaceState({}, document.title, clean_uri)
        }
    }
}

function setAuthLink() {
    $('#header-signin').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl+'&next=%23/reader-dashboard')
    $('#redeem-login').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl + '&next=%23/subscriptions')
    $('#header-signin-mobile').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl)
}

function setContentRedirect() {
    if (window.location.hash.includes('reader-content')) {
        window.location = window.location.origin + "/share/" + window.location.hash.split('/').pop()
    }
}

function setMenuDisplay() {
    $.ajax({
        url: apiUrl + '/users/self',
        method: 'GET',
        headers: {
            'Authorization': 'SSO ' + token
        }
    }).done(function (data) {
        $('.dashboard').removeClass('hidden')
        $('.no-login').remove()
        // $('#redeem-login').remove()
    }).fail(function (error) {
        // $('#redeem').remove()
    });
    return token
}

function verifyActiveCode(isUsed) {
    $.ajax({
        url: apiUrl + '/pay/code/activate',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            uid: activeCode,
            use: isUsed
        }),
        headers: {
            'Authorization': 'SSO ' + token
        }
    })
        .done(function (data) {
            $('#redeemModal .modal-body input').addClass('valid')
            $('.modal-footer button').removeAttr('disabled')
        })
        .fail(function (error) {
            if (error.responseJSON) {
                if (error.responseJSON.detail) {
                    $('.invalid').html(error.responseJSON.detail)
                } else {
                    $('.invalid').html(error.responseJSON[0])
                }
            } else {
                $('.invalid').html('Redeem code is invalid.')
            }
            $('#redeemModal .modal-body input').addClass('invalid')
            $('.modal-footer button').prop('disabled', true)
        })
        .always(function (jqXHR) {
            if (jqXHR.status === 201) {
                localStorage.removeItem('activeCode')
                document.location.href = appUrl + '?redeem=true'
            }
        })
}

function setDefaultLanguage() {
    var languageBrowser = (navigator.language || navigator.browserLanguage).toLowerCase()
    var path = location.pathname.toLocaleLowerCase()
    if (!localStorage.getItem("lang")) {
        if (languageBrowser.includes('ja')) {
            location.pathname = location.pathname.replace(/\/(en|zh-tw|zh-cn)\//, '/ja/')
            languageBrowser = 'ja'
        } else if (languageBrowser.includes('en')) {
            location.pathname = location.pathname.replace(/\/(ja|zh-tw|zh-cn)\//, '/')
            languageBrowser = 'en'
        } else if (languageBrowser === 'zh-tw') {
            location.pathname = location.pathname.replace(/\/(en|ja|zh-cn)\//, '/tw/')
            languageBrowser = 'zh-tw'
        } else if (languageBrowser === 'zh-cn') {
            location.pathname = location.pathname.replace(/\/(en|ja|zh-tw)\//, '/cn/')
            languageBrowser = 'zh'

        } else if (languageBrowser === 'th') {
            location.pathname = location.pathname.replace(/\/(en|ja|zh-tw)\//, '/th/')
            languageBrowser = 'th'

        } else if (languageBrowser === 'id') {
            location.pathname = location.pathname.replace(/\/(en|ja|zh-tw)\//, '/id/')
            languageBrowser = 'id'

        } else {
            languageBrowser = 'en'
        }
        localStorage.setItem("lang", languageBrowser)
    }

    if(path.indexOf(localStorage.getItem('lang')) == -1 && localStorage.getItem('lang') != 'en') {
        console.log(path.split('/')[2])
        if(location.pathname.indexOf('cn') == -1 && localStorage.getItem('lang').toUpperCase() == 'zh'.toUpperCase()) {
            if(path.split('/')[2]==undefined){
                location.href = '/cn/'
            } else if(path.split('/')[2]== ''){
                location.href = '/cn/' + path.split('/')[1] + '/' + location.hash
            } else {
                location.href = '/cn/' + path.split('/')[2] + '/' + location.hash
            }
        } else if(location.pathname.indexOf('tw') == -1 && localStorage.getItem('lang').toUpperCase() == 'zh-tw'.toUpperCase()) {
            if(path.split('/')[2]==undefined){
                location.href = '/tw/' + path.split('/')[1]
            } else if(path.split('/')[2]== ''){
                location.href = '/tw/' + path.split('/')[1] + '/' + location.hash
            } else {
                location.href = '/tw/' + path.split('/')[2] + '/' + location.hash
            }
        } else if(localStorage.getItem('lang').toUpperCase() != 'zh'.toUpperCase() && localStorage.getItem('lang').toUpperCase() != 'zh-tw'.toUpperCase()){
            if(path.split('/')[2]==undefined){
                location.href = '/' + localStorage.getItem('lang') + '/'
            } else if(path.split('/')[2]== ''){
                location.href = '/cn/' + path.split('/')[1] + '/' + location.hash
            } else {
                location.href = '/' + localStorage.getItem('lang') + '/' + path.split('/')[2] + '/' + location.hash
            }
        }
    } else if(path.indexOf(localStorage.getItem('lang')) == -1 && localStorage.getItem('lang') == 'en') {
        if((location.pathname.indexOf('th') != -1 || location.pathname.indexOf('id') != -1 || location.pathname.indexOf('tw') != -1 || location.pathname.indexOf('cn') != -1 || location.pathname.indexOf('ja') != -1) && localStorage.getItem('lang').toUpperCase() == 'en'.toUpperCase()) {
            if(path.split('/')[2]==undefined){
                location.href = '/' + location.hash
            } else {
                if(path.split('/')[2]=='') {
                    location.href = '/'
                } else {
                    location.href = '/' + path.split('/')[2] + '/' + location.hash
                }
            }
        }
    }
    $('.language select').val(path)
}

function goHero() {
    $('html,body').animate({scrollTop: $('.hero').offset().top - 90}, 300)
    $('#navbarsExample07').removeClass('show')
    $('.navbar-toggler').addClass('collapsed')
    $('.navbar-toggler').attr("aria-expanded", "false");

}

function getParameterByName(name) {
    var url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

function setScrollTopButton() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1000) {
            $('.scroll-up-arrow').fadeIn()
        } else {
            $('.scroll-up-arrow').fadeOut()
        }
    })
    $('.scroll-up-arrow').click(function () {
        $('.scroll-up-arrow').tooltip('hide')
        $('body,html').animate({
            scrollTop: 0
        }, 800)
        return false
    })
    $('.scroll-up-arrow').tooltip('show')
}

function setScrollBottomButton() {
    $('body,html').animate({
        scrollTop: 930
    }, 800)
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function keytab(id) {

    if ($('#code-' + id)[0].value.length >= 4) {
        if (id === 4) {
            document.getElementById('code-' + (id)).blur()
        } else {
            document.getElementById('code-' + (id + 1)).focus();
        }
    }
    var max = 5;
    if ($('#code-' + id)[0].val().length > max) {
        $('#code-' + id)[0].val($('#code-' + id)[0].val().substr(0, max));
    }
}

function openUrl(url) {
    window.open(url, '_blank');
}
