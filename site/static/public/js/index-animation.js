var controller = new ScrollMagic.Controller()

// section content how-it-works
var fadein_tween = TweenMax.fromTo('.mac', 1, 
  { xPercent:-60 , opacity:0 , ease:Power1.easeInOut  },
  { xPercent:0 , opacity:1 , ease:Power1.easeInOut  })

var scene = new ScrollMagic.Scene({
  triggerElement: ".content",
  trigerHook:"onEnter",
  duration: "30%"
})
.setTween(fadein_tween)
// .addIndicators({name: "mac"})
.addTo(controller)

fadein_tween = TweenMax.fromTo('.iPhone-Xs', 1, 
  { xPercent:60 , opacity:0.2 , ease:Power1.easeInOut  },
  { xPercent:0 , opacity:1 , ease:Power1.easeInOut  })

scene = new ScrollMagic.Scene({
  triggerElement: ".content",
  trigerHook:"onEnter",
  duration: "30%"
})
.setTween(fadein_tween)      
.addTo(controller)

// section tool
fadein_tween = TweenMax.staggerFromTo(
  ".tool-animate", 2,
    {yPercent: -100, opacity:0 },
    {yPercent: 0, opacity:1, ease: Back.easeOut}, 0.15)

scene = new ScrollMagic.Scene({
  triggerElement: ".tools",
  trigerHook:"onEnter",
  duration: "45%"
})
.setTween(fadein_tween)
// .addIndicators({name: "tool"})
.addTo(controller)

// // section vocabulary
fadein_tween = TweenMax.fromTo('.key-withshadow', 1, 
  { yPercent:0 , opacity:0.2 , ease:Power1.easeInOut  },
  { yPercent:0 , opacity:1 , ease:Power1.easeInOut  })

scene = new ScrollMagic.Scene({
  triggerElement: ".vocabulary",
  trigerHook:"onEnter",
  duration: "30%"
})
.setTween(fadein_tween)
// .addIndicators({name: "vocabulary"})
.addTo(controller)

// // section cards
fadein_tween = TweenMax.staggerFromTo(
  ".card-animate", 2,
    {yPercent: 100},
    {yPercent: 0, ease: Back.easeOut}, 0.15)

scene = new ScrollMagic.Scene({
  triggerElement: ".library",
  trigerHook:"onEnter",
  duration: "45%"
})
.setTween(fadein_tween)
// .addIndicators({name: "library"})
.addTo(controller)

// // section level-chart
fadein_tween = TweenMax.fromTo('.level-chart', 1, 
  { yPercent:0 , opacity:0.2 , ease:Power1.easeInOut  },
  { yPercent:0 , opacity:1 , ease:Power1.easeInOut  })

scene = new ScrollMagic.Scene({
  triggerElement: ".charts",
  trigerHook:"onEnter",
  duration: "30%"
})
.setTween(fadein_tween)
// .addIndicators({name: "level-chart"})
.addTo(controller)

$(document).ready(function(){
  $("#dictionary").hover(function() {
    $("#dictionary-img").css("z-index","4").css("box-shadow","0 0 40px 0 #509bc6");
  },function(){
    $("#dictionary-img").css("z-index","1").css("box-shadow","0 8px 40px -5px rgba(80, 155, 198, 0.5)");
  })

  $("#wordpond").hover(function() {
    $("#wordpond-img").css("z-index","4").css("box-shadow","0 0 40px 0 #509bc6");
  },function(){
    $("#wordpond-img").css("z-index","2").css("box-shadow","0 8px 40px -5px rgba(80, 155, 198, 0.5)");
  })

  $("#characterpond").hover(function() {
    $("#characterpond-img").css("z-index","4").css("box-shadow","0 0 40px 0 #509bc6");
  },function(){
    $("#characterpond-img").css("z-index","3").css("box-shadow","0 8px 40px -5px rgba(80, 155, 198, 0.5)");
  })

  $("#radicalpond").hover(function() {
    $("#radicalpond-img").css("z-index","4").css("box-shadow","0 0 40px 0 #509bc6");
  },function(){
    $("#radicalpond-img").css("z-index","2").css("box-shadow","0 8px 40px -5px rgba(80, 155, 198, 0.5)");
  })
})