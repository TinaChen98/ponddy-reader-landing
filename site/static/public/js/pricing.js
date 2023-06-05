activeCode = ''
updateKeyTimer = null
String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
plan = {
    standarMonth: 'reader-standar-monthly',
    standarAnnual: 'reader-standard-annual',
    standarSemiAnnual: 'reader-standard-6m',
    school: 'price',
}
plan_dev = {
    standarMonth: 'reader-6m',
    standarAnnual: 'reader-standard-annual',
    standarSemiAnnual: 'reader-standard-6m',
    school: 'price',
}
$(document).ready(function () {
    $("#period-dropdown").on('click', '.dropdown-item', function () {
        // console.log($(this.innerHTML))
        $("#dropdownMenuButton").html($(this).text())
        // $("#dropdownMenuButton").val($(this).text());
        $("#standard-pricing").html($(".price", this).text() + "<div class=\"annual-text\">/" + $(".period", this).text() + "</div>")
        // $(".btn:first-child").innerHTML=$(this).innerHTML


        setStanderdCardAuthLink($(".period", this).text())
    });


    init_redeem_input()
    initTableHead()
    setPricingAuthLink()
    $('#redeemModal').on('hide.bs.modal', function (e) {
        activeCode = ''
        $("#redeem_input").val(activeCode)
        localStorage.removeItem('activeCode')
        $(".modal-footer a").attr("disabled", 'disabled');

    })
})

function initTableHead() {
    $(document).on('scroll', function () {
        if ($(this).scrollTop() >= $('.subscribers').position().top - 60) {
            if ($('nav').is(":hidden")) {
                $('nav').show()
                $('.redeem_icon').show()
            }
        } else if ($(this).scrollTop() >= $('.features').position().top + 120) {
            if (!$('nav').is(":hidden")) {
                $('nav').hide()
                $('.redeem_icon').hide()
            }
        } else {
            if ($('nav').is(":hidden")) {
                $('nav').show()
                $('.redeem_icon').show()

            }
        }
    })
}

function click_redeem() {
    if (activeCode.length === 19) {
        url = "https://auth-dev.ponddy.com/auth/?client_id=fe020207-6e96-4c58-963fa34321042c26&redirect_uri=https://reader-dev.ponddy.com/app/&next=%23/subscriptions"
        window.open(url, '_self');
    } else {

    }

}

function init_redeem_input() {

    $("#redeem_input").on('keyup', function () {

        if (updateKeyTimer) {
            clearTimeout(updateKeyTimer);
        }
        updateKeyTimer = setTimeout(function () {
            activeCode = $("#redeem_input").val()
            for (var i = 1; i <= ($("#redeem_input").val().length / 5); i++) {
                if (activeCode[4 + (i - 1) * 5] != '-') {
                    activeCode = activeCode.splice(4 + (i - 1) * 5, '0', '-').substring(0, 19)
                    $("#redeem_input").val(activeCode)
                }
            }
            if (activeCode.length === 19) {
                localStorage.setItem('activeCode', activeCode)
                $(".modal-footer a").removeAttr("disabled");
            } else {
                $(".modal-footer a").attr("disabled", 'disabled');
            }
        }, 200)

    })
    // $("#redeem_input").on('paste', function (e) {
    //     console.log(e)
    //     var pastedText = window.clipboardData.getData("Text");
    //     activeCode = pastedText.replace(/[^a-zA-Z0-9]+/g, "");
    //     $("#redeem_input").val(activeCode)
    //     // console.log('2')
    //     // console.log(activeCode)
    //     // activeCode = activeCode.replace(/[^a-zA-Z0-9]+/g, "");
    // })
    document.querySelector("input").addEventListener("paste", function (e) {
        e.preventDefault()

        var pastedText = e.clipboardData.getData("text/plain")
        pastedText = activeCode + pastedText.replace(/[^a-zA-Z0-9]+/g, "");
        activeCode = pastedText.replace(/[^a-zA-Z0-9]+/g, "");
        $("#redeem_input").val(activeCode)

    })

}

function showAllTable() {
    // $('#showAllbtn').click()
    $(".more-row").fadeToggle(1000)
    $(".more_feature_wrap").hide()
}

function setPricingAuthLink() {
    if (appUrl.includes('dev')) {
        $('#pricing_card_lite').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl)
        $('#pricing_card_school').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl
            + '&next=%23/subscriptions' + '%3Fplan%3D' + plan_dev.school)
        $('#pricing_card_standard').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl
            + '&next=%23/subscriptions' + '%3Fplan%3D' + plan_dev.standarMonth)
        $('.pricing_card_lite').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl)
        $('.pricing_card_school').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl
            + '&next=%23/subscriptions' + '%3Fplan%3D' + plan_dev.school)
        $('.pricing_card_standard').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl
            + '&next=%23/subscriptions' + '%3Fplan%3D' + plan_dev.standarMonth)
    } else {
        $('#pricing_card_lite').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl)
        $('#pricing_card_school').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl
            + '&next=%23/subscriptions' + '%3Fplan%3D' + plan.school)
        $('#pricing_card_standard').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl
            + '&next=%23/subscriptions' + '%3Fplan%3D' + plan.standarMonth)
        $('.pricing_card_lite').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl)
        $('.pricing_card_school').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl
            + '&next=%23/subscriptions' + '%3Fplan%3D' + plan.school)
        $('.pricing_card_standard').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl
            + '&next=%23/subscriptions' + '%3Fplan%3D' + plan.standarMonth)
    }

}

function setStanderdCardAuthLink(period) {
    var currentHostPlan

    if (appUrl.includes('dev')) {
        currentHostPlan = plan_dev
    } else {
        currentHostPlan = plan
    }
    switch (period) {
        case 'Monthly':

            $('#pricing_card_standard').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl + '&next=%23/subscriptions' + '%3Fplan%3D' + currentHostPlan.standarMonth)
            $('.pricing_card_standard').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl + '&next=%23/subscriptions' + '%3Fplan%3D' + currentHostPlan.standarMonth)
            break
        case 'Semi-Annual':
            $('#pricing_card_standard').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl + '&next=%23/subscriptions' + '%3Fplan%3D' + currentHostPlan.standarSemiAnnual)
            $('.pricing_card_standard').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl + '&next=%23/subscriptions' + '%3Fplan%3D' + currentHostPlan.standarSemiAnnual)
            break
        case 'Annual':
            $('#pricing_card_standard').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl + '&next=%23/subscriptions' + '%3Fplan%3D' + currentHostPlan.standarAnnual)
            $('.pricing_card_standard').attr('href', authUrl + '?client_id=' + clientId + '&redirect_uri=' + appUrl + '&next=%23/subscriptions' + '%3Fplan%3D' + currentHostPlan.standarAnnual)
            break
    }
}
