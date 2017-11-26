
function setImageListener() {
  $("#waldo").click(function(e){
    let pos = $(this).position();
    let width = $(this).width();
    let height = $(this).height();
    //The following are the x/y coordinates of the mouse click relative to image.
    console.log([pos.left, pos.top]);
    let x = e.pageX - pos.left;
    let y = e.pageY - pos.top;
    let xPercent = x / width;
    let yPercent = y / height;
    console.log([xPercent, yPercent]);
    $('.dropdown').css({
      top: yPercent * height + pos.top,
      left: xPercent * width + pos.left,
      display: 'inline',
    });
  });
}

function setWindowListener() {
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    console.log(event.target);
    if (!event.target.matches('.dropdown') && !event.target.matches('#waldo')) {
      $('.dropdown').hide();
    }
  }
}

$(function() {
  setWindowListener();
  setImageListener();

});
