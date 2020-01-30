
'use strict'

$(document).scroll(() => {
  let y = $(this).scrollTop();
  if (y > window.screen.height - 150) {
    $('.header').css("background-color", "rgb(32,32,32)");
  } else {
    $('.header').css("background-color", "black");
  }
})
