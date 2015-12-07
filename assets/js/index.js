$(function() {
  const PARENT_FACE_WIDTH = 135;

  var imageFace = $('#image-face');
  var imagePreview = $('#image-preview');

  $('#image-file-field').change(function() {
    var data = $(this)[0].files[0];

    showPreview(data);
  });

  $('#image-upload').click(function(event) {
    event.preventDefault();

    processFace();
  });

  function findScale(face) {
    return (PARENT_FACE_WIDTH / face.width);
  }

  function placeFace() {
    var imagePath = imagePreview.attr('src');

    imageFace.attr('src', imagePath);
  }

  function processFace() {
    imagePreview.faceDetection({
      complete: function(faces) {
        var face = faces[0];

        if (face) {
          placeFace();
          sizeFace(face);
        } else {
          alert('Your image was bullshit');
        }
      }
    });
  }

  function showPreview(data) {
    var reader = new FileReader();

    reader.onload = function(event) {
      imagePreview.
        attr('src', event.target.result).
        height(300);
    }

    reader.readAsDataURL(data);
  }

  function sizeFace(face) {
    var scale = findScale(face);

    console.log(scale);

    // This math literally does not work yet
    imageFace.
      css('margin-left', -(face.x)).
      css('margin-top', -(face.y / (scale * 1.5))).
      css('transform', 'scale(' + scale + ')');
  }
});
