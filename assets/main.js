
function setImageListener() {
  $("#waldo_image").click(function(e){
    let pos = $(this).position();
    let width = $(this).width();
    let height = $(this).height();

    //The following are the x/y coordinates of the mouse click relative to image.
    let x = e.pageX - pos.left;
    let y = e.pageY - pos.top;
    let xPercent = x / width;
    let yPercent = y / height;
    console.log(xPercent, yPercent);
    $('.dropdown').css({
      top: yPercent * height + pos.top,
      left: xPercent * width + pos.left,
      display: 'inline',
    });
    $.data($('.dropdown')[0], 'clickPosition', [e.pageX, e.pageY]);
  });
}

function setWindowListener() {
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropdown') && !event.target.matches('#waldo_image')) {
      $('.dropdown').hide();
    }
  }
}

function setDropdownListener() {
  $('.dropdown').on('click', function(e) {
    checkPosition($(e.target).attr('id'));
  });
}

function checkPosition(id) {
  let selected = $.data($('.dropdown')[0], 'clickPosition');
  let image = $('#waldo_image');
  let image_pos = image.position();
  console.log(selected);
  let percentX = (selected[0] - image_pos.left) / image.width();
  let percentY = (selected[1] - image_pos.top) / image.height();
  validateCharacter(id, [percentX, percentY]);
}

function validateCharacter(id, coords) {
  let corrPos;
  let tag = {
    id: id,
    coords: coords,
  };

  $.ajax({
    url: 'http://localhost:4567/post',
    type: 'POST',
    data: JSON.stringify(tag),
    contentType: "application/json",
    dataType: "json",
  }).done(function(data) {
    if(data.valid) {
      found(id);
    }
    else {
      $('#waldo_image').highlight('failure');
    }
    console.log('Response: ' + data.valid);
  }).fail(function( jqXHR, textStatus ) {
    alert( "Request failed: " + textStatus + jqXHR );
  });
/*
  if(corrPos && closeEnough(corrPos, coords)) {
    console.log('close enough');
    $('#waldo_image').highlight('success');
  }
  else {
    $('#waldo_image').highlight('failure');
  }
  */
}

function closeEnough(pos1, pos2) {
  console.log(((pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2)**(1/2));
  return ((pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2)**(1/2) < 0.05;
}

$(function() {
  setWindowListener();
  setImageListener();
  setDropdownListener();
});

jQuery.fn.highlight = function(alert) {
  let color = (alert == 'success') ? '#7DDA77' : '#DA7877';
  $(this).each(function() {
    var el = $(this);
    el.before("<div/>");
    el.prev()
    .width(el.width())
    .height(el.height())
    .css({
        "position": "absolute",
        "background-color": color,
        "opacity": ".9"
    })
    .fadeOut(500);
  });
}

function found(id) {
  $(`#${id}`).css( { color: 'green' } );
  $('#waldo_image').highlight('success');
}
