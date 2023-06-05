var sentEmail = 'reader_sales_test@ponddy-edu.com'

$(document).ready(function () {
    AOS.init();
    urlWithParams()
    setOwl()
    var $recaptcha = document.querySelector('#g-recaptcha-response');

    if ($recaptcha) {

        $recaptcha.setAttribute("required", "required");
    }

    $("#contact_us_form").submit(function (e) {
        e.preventDefault();
        sentMail()
    })
    // $("#contact_us_form").submit(function (e) {
    //     e.preventDefault();
    //     var url = 'https://ms.ponddy.com/auth/';
    //     $.ajax({
    //         type: "POST",
    //         url: url,
    //         beforeSend: function (xhr) {
    //             xhr.setRequestHeader('cookie', null);
    //         },
    //         data: {username: 'reader-frontend', password: 'UnfBdVQiNioy'},
    //         success: function (data) {
    //             sentMail_old_version(data.token)
    //         }
    //     });
    // })


    $('#contact-us-modal').on('show.bs.modal', function (e) {
        $("#contact_form_space").removeClass("d-none");
        $("#contact_form_success").addClass("d-none");
    })
})

function setOwl() {
    var owl_feature = $('#feature-owl')

    owl_feature.owlCarousel({
        item: 1,
        loop: true,
        margin: 50,
        autoWidth: true,
        autoplay: true,
        responsiveClass:true,
        lazyLoad:true,
        autoplayTimeout: 18000,
        autoplayHoverPause: true,
        responsive:{
            0 :{
                items:1,
                margin: 20,
            },
            767:{
                margin: 40,
            }
        }
    })
    owl_feature.on('changed.owl.carousel', function(e) {
        owl_feature.trigger('stop.owl.autoplay');
        owl_feature.trigger('play.owl.autoplay');
    });
    $('#how-it-works .next-btn').click(function () {
        if (screen.width > 1100) {
            owl_feature.trigger('next.owl.carousel')

        } else {
            owl_feature.trigger('prev.owl.carousel', [343])

        }
    })

    $('#how-it-works .prev-btn').click(function () {
        if (screen.width > 1100) {
            owl_feature.trigger('prev.owl.carousel', [343])
        } else {
            owl_feature.trigger('next.owl.carousel')
        }
    })
    var owl_user = $('#owl-user')
    owl_user.owlCarousel({
        item: 1,
        loop: true,
        margin: 35,
        autoWidth: true,
        responsiveRefreshRate: 300,
        autoplayTimeout: 20000,
        autoplay: true,
        lazyLoad:true,
        autoplayHoverPause: true,
    })
    owl_user.on('changed.owl.carousel', function(e) {
        owl_user.trigger('stop.owl.autoplay');
        owl_user.trigger('play.owl.autoplay');
    });
    owl_user.trigger('refresh.owl.carousel');
    $('.user .next-btn').click(function () {
        console.log('click next')
        if (screen.width > 810) {
            owl_user.trigger('next.owl.carousel')
        } else {
            owl_user.trigger('prev.owl.carousel', [343])
        }
    })
    $('.user .prev-btn').click(function () {
        if (screen.width > 810) {
            owl_user.trigger('prev.owl.carousel', [343])
        } else {
            owl_user.trigger('next.owl.carousel')
        }
    })
}

function urlWithParams() {
    // $('#contact-us-modal').modal('show')
    var params = window.location.search.substr(1);
    var act = findGetParameter('act')
    if (act == 'free_membership') {
        $('#contact-us-modal').modal('show')
    }
}

function submit() {
    var res = grecaptcha.getResponse();
    console.log(res)
    var recaptcha_response = grecaptcha.getResponse();
    var form = $("#contact_us_form").find("input[name!='g-recaptcha-response']");
    var formdata = form.serialize() + '&source=' + getSource() + '&timestamp=' + new Date();
    formdata = formdata
        .replace(/[=]/g, ': ')
        .replace(/[&]/g, '<br>')
        .replace('%40', '@')

    console.log(formdata)
    var formdata = form.serialize() + '&=Source=' + getSource() + '&timestamp=' + new Date();
    formdata = formdata
        .replace(/[=]/g, ': ')
        .replace(/[&]/g, '<br>')
        .replace('%40', '@')
    var title = 'Free Reader account request' + '  <' + getSource() + '>'

    var data = JSON.stringify({
        "subject": title,
        "body": formdata,
        "to": sentEmail,
        "g_recaptcha_response": recaptcha_response
    })
    console.log(decodeURIComponent(data))
}

function sentMail() {
    var recaptcha_response = grecaptcha.getResponse();
    grecaptcha.reset()
    var form = $("#contact_us_form").find("input[name!='g-recaptcha-response']");

    var formdata = form.serialize() + '&source=' + getSource() + '&timestamp=' + new Date();
    formdata = formdata
        .replace(/[=]/g, ': ')
        .replace(/[&]/g, '<br>')
        .replace('%40', '@')

    $("#submit_loading").removeClass("d-none");

    var title = 'Free Reader account request' + '  <' + getSource() + '>'
    var data = decodeURIComponent(JSON.stringify({
        "subject": title,
        "body": formdata,
        "to": sentEmail,
        "g_recaptcha_response": recaptcha_response
    }))
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        url: 'https://reader-api-dev.ponddy.com/api/v1' + '/supports/emails/send',
        data: data,

        success: function (data) {

            // $('#contact-us-modal').modal('hide');
            $("#submit_loading").addClass("d-none");
            $("#contact_submit_btn").attr("disabled", false);
            $("#contact_form_success").removeClass("d-none");
            $("#contact_form_space").addClass("d-none");
            document.getElementById("contact_us_form").reset();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Sending failed, please try again later.');
        }
    });

}

function sentMail_old_version(token) {
    var url = 'https://ms.ponddy.com/mail/';
    var form = $("#contact_us_form");

    var formdata = form.serialize() + '&=Source=' + getSource()
    formdata = formdata
        .replace(/[=]/g, ': ')
        .replace(/[&]/g, '<br>')
        .replace('%40', '@')
    $("#submit_loading").removeClass("d-none");
    $.ajax({
        type: "POST",
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('token', token);
        },
        data: JSON.stringify({
            "subject": "Developer Test Free Reader account request",
            "body": formdata,
            "to": [sentEmail]
        }),

        success: function (data) {

            // $('#contact-us-modal').modal('hide');
            $("#submit_loading").addClass("d-none");
            $("#contact_submit_btn").attr("disabled", false);
            $("#contact_form_success").removeClass("d-none");
            $("#contact_form_space").addClass("d-none");
            document.getElementById("contact_us_form").reset();
        },


    });
}

function getSource() {
    console.log(document.URL)
    if (document.URL.toString().includes('iponddy')) {
        return 'iPonddy'
    } else {
        return 'Ponddy'
    }
}

function goHowItWork() {
    $('html,body').animate({scrollTop: $('.how-it-works').offset().top - 90}, 300)
    $('#navbarsExample07').removeClass('show')
    $('.navbar-toggler').addClass('collapsed')
    $('.navbar-toggler').attr("aria-expanded","false");
}
