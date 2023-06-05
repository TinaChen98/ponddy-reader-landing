var sentEmail = 'reader_sales_test@ponddy-edu.com'

$(document).ready(function() {
  $('.main li .user').addClass('active')
  $('.user').addClass('active')
  $('#content_0').collapse()
  $('#content_learning_0').collapse()
  setResourcesNavsActive()
  hoverLearnMoreBtn()
    // clickLearnMoreBtn()
  urlWithHash()
  Language()

  var $recaptcha = document.querySelector('#g-recaptcha-response');

  var nowUrl = location.href.split('/')

  for (var i = 0; i < nowUrl.length; i++) {
    if (nowUrl[i] == 'tw') {
      console.log(nowUrl[i])
      $('.simplified_section').hide()
      $('.traditional_section').show()
      $('.tw_font').addClass('active')
      $('.cn_font').removeClass('active')
      break;
    } else {
      $('.simplified_section').show()
      $('.traditional_section').hide()
      $('.cn_font').addClass('active')
      $('.tw_font').removeClass('active')
    }
  }


  if ($recaptcha) {
    $recaptcha.setAttribute("required", "required");
  }
})

function Language() {
  $('.learning_lang').hide()
  if ($('body').attr('class') == "tw" || $('body').attr('class') == "cn") {
    $('.learning_zh').show()
  } else {
    $('.learning_en').show()
  }
}


function urlWithHash() {
  var hash = window.location.hash.substring(1)
  if (!hash) {
    return
  }
  $('.hero').hide()
  $('.resources').hide()
  $('.resource_description').show()
  clickMenu(hash)
  window.addEventListener('hashchange', function(e) {
    var hash = window.location.hash.substring(1)
    if (!hash) {
      return
    }
    $('.hero').hide()
    $('.resources').hide()
    $('.resource_description').show()
    clickMenu(hash)
  }, false);
}


function getSource() {
  if (document.URL.toString().includes('iponddy')) {
    return 'iPonddy'
  } else {
    return 'Ponddy'
  }
}


function setResourcesNavsActive() {
  $('#nav-link-all').click(function() {
    $(".nav-link").removeClass(" active");
    $("#nav-link-all").addClass(" active");
    $(".teachers").css("display", "")
    $(".learners").css("display", "")
  })

  $('#nav-link-teacher').click(function() {
    $(".nav-link").removeClass(" active");
    $("#nav-link-teacher").addClass(" active");
    $(".teachers").css("display", "")
    $(".learners").css("display", "none")
  })

  $('#nav-link-student').click(function() {
    $(".nav-link").removeClass(" active");
    $("#nav-link-student").addClass(" active");
    $(".teachers").css("display", "none")
    $(".learners").css("display", "")
  })
}

function hoverLearnMoreBtn() {
  $(".teachers .card a").hover(
    function() {
      // $(this).prev().find(".card-cover").css("display", "")
      $(this).css({ "background": "#93E2FA", "color": "#FFFFFF" })
      $(this).find("img").first().css("display", "none")
      $(this).find("img").last().css("display", "")
    },
    function() {
      if (!$(this).hasClass("active")) {
        // $(this).prev().find(".card-cover").css("display", "none")
        $(this).removeAttr("style")
        $(this).find("img").first().css("display", "")
        $(this).find("img").last().css("display", "none")
      }
    }
  )
  $(".teachers .card .card-content").hover(function() {
    $(this).find(".card-cover").css("display", "")
  }).mouseleave(function() {
    $(this).find(".card-cover").css("display", "none")
  })

  // $(".teachers .card a").click(function () {
  //     showCard()
  //     if (!$(this).hasClass("active")) {
  //         $(this).addClass("active")
  //         $(this).prev().find(".card-cover").css("display", "")
  //         $(this).css({"background": "#93E2FA", "color": "#FFFFFF"})
  //         $(this).find("img").first().css("display", "none")
  //         $(this).find("img").last().css("display", "")
  //     } else {
  //         $(this).removeClass("active")
  //         $(this).prev().find(".card-cover").css("display", "none")
  //         $(this).removeAttr("style")
  //         $(this).find("img").first().css("display", "")
  //         $(this).find("img").last().css("display", "none")
  //     }
  // })
  $(".learners .card a").hover(
    function() {
      // $(this).prev().find(".card-cover").css("display", "")
      $(this).css({ "background": "#FFC05C", "color": "#FFFFFF" })
      $(this).find("img").first().css("display", "none")
      $(this).find("img").last().css("display", "")
    },
    function() {
      if (!$(this).hasClass("active")) {
        // $(this).prev().find(".card-cover").css("display", "none")
        $(this).removeAttr("style")
        $(this).find("img").first().css("display", "")
        $(this).find("img").last().css("display", "none")
      }
    }
  )

  $(".learners .card .card-content").hover(function() {
    $(this).find(".card-cover").css("display", "")
  }).mouseleave(function() {
    $(this).find(".card-cover").css("display", "none")
  })
  var $myGroup = $('#myGroup');
  $myGroup.on('show.bs.collapse', '.collapse', function() {
    $myGroup.find('.collapse.in').collapse('hide');
  });
}

function showCard(btn_id) {
  var menuName = '';
  
  switch (btn_id) {
    case 'card_t_btn_1':
      menuName = 'user'
      break
    case 'card_t_btn_2':
      menuName = 'curricula'
      break
    case 'card_t_btn_3':
      menuName = 'teaching'
      break
    case 'card_l_btn_1':
      menuName = 'self'
      break
    case 'card_l_btn_2':
      menuName = 'learning'
      break
    default:
      menuName = btn_id
      break
  }

  $('.hero').hide()
  $('.resources').hide()
  $('.promote').hide()
  $('.resource_description').show()
  clickMenu(menuName)
  $("html, body").animate({ scrollTop: 0 }, "slow");
}

function clickMenu(currentMenu) {
  $('#resouceCardMenu a').removeClass('active')
  $('#resouceCardMenu a .' + currentMenu).addClass('active')
  $('.main li').removeClass('active')
  $('.main li .' + currentMenu).addClass('active')

  $('.section').removeClass('active')
  $('.' + currentMenu).addClass('active')
  location.hash = currentMenu
}

function clickMenuAtHeader(currentMenu) {
  $('#resouceCardMenu a').removeClass('active')
  $('#resouceCardMenu a.' + currentMenu).removeClass('active')
  $('.section').removeClass('active')
  $('.' + currentMenu).addClass('active')

  showCard(currentMenu)
  $('#navbarsExample07').collapse('hide')
  location.hash = currentMenu
}

function clickResourcesHome() {
  location.hash = ''
  location.reload()
}

function collapes(index) {
  console.log(index)
  if ($('#content_' + index).hasClass('open')) {
    $('#content_' + index).removeClass('open')
  } else {
    $('#content_' + index).addClass('open')
  }
}

function scrollToTop() {
  $("html, body").animate({ scrollTop: 160 }, "slow");
}


function changeLanguage(lang) {
  var nowPage = location.href.split('/')
  var page = nowPage[nowPage.length - 1]
  if (lang == 'en') {
    location.href = '/resources/' + page
  } else {
    location.href = '/' + lang + '/resources/' + page
  }

}

function clickResourceSimp() {
  console.log('simp')
  $('.simplified_section').show()
  $('.traditional_section').hide()
  $('.tw_font').removeClass('active')
  $('.cn_font').addClass('active')
}

function clickResourceTrad() {
  $('.simplified_section').hide()
  $('.traditional_section').show()
  $('.tw_font').addClass('active')
  $('.cn_font').removeClass('active')
}