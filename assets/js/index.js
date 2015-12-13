$(function() {
  const PARENT_FACE_X = '157px'; // Distance of face hole from left. Gross.
  const PARENT_FACE_Y = '76px' // Distance of face hole from top. Gross.
  const PARENT_FACE_HEIGHT = '186px' // The height of the face hole. Gross.
  const PARENT_FACE_WIDTH = 135; // The width of the face hole. Gross.

  var imageFace = $('#image-face'); // The element the face is planted onto
  var imageTarget = $('#image-target'); // The "face hole". Gross.
  var imagePreview = $('#image-preview');

  // Place the image target element on document load from the constants that are
  // defined above.
  $(document).ready(function() {
    imageTarget.
      css('left', PARENT_FACE_X).
      css('top', PARENT_FACE_Y).
      css('height', PARENT_FACE_HEIGHT).
      css('width', PARENT_FACE_WIDTH)
  });

  // Pulls the face out from the file input
  $('#image-file-field').change(function() {
    var data = $(this)[0].files[0];

    showPreview(data);
  });

  // Return how big the original face is in comparision with the "face hole".
  // Again, gross.
  function findScale(face) {
    return (PARENT_FACE_WIDTH / face.width);
  }

  // Spits the face out into the document. To be honest I just wanted to use the
  // word "spits" here and you can't stop me. I won't merge your PR to change
  // that.
  function placeFace() {
    var imagePath = imagePreview.attr('src');

    imageFace.attr('src', imagePath);
  }

  // This is where the face detection / image "validation" is done.
  function processFace() {
    imagePreview.faceDetection({
      complete: function(faces) {
        var face = randomFace(faces);

        if (face) {
          placeFace();
          sizeFace(face);
        } else {
          alert(
            "Yikes! Couldn't find a face in this image. Try another one. " +
            "Don't worry it's not your fault programming is a nightmare."
          );
        }
      }
    });
  }

  // I haven't gone ahead and implemented a way to actually target a face so I'm
  // just picking a random face that's detected because I hate humanity.
  function randomFace(faces) {
    return $.rand(faces);
  }

  // This sets a preview field that's used for facial detection. A future
  // refactor could probably remove this step altogether and do everything on
  // the fly but that's a step for another day y'all.
  function showPreview(data) {
    var reader = new FileReader();

    reader.onload = function(event) {
      imagePreview.attr('src', event.target.result)
      processFace();
    }

    reader.readAsDataURL(data);
  }

  // Actually size the face behind the main image
  function sizeFace(face) {
    var scale = findScale(face);
    var marginLeft = face.x * scale;
    var marginTop = face.y * scale;

    imageFace.
      css('margin-left', -(marginLeft)).
      css('margin-top', -(marginTop)).
      css('transform', 'scale(' + scale + ')');
  }

  // Let's make a random function that we're stealing from Stack Overflow
  // because my time is worth something to me and you don't know me.
  $.rand = function(arg) {
    if ($.isArray(arg)) {
      return arg[$.rand(arg.length)];
    } else if (typeof arg === "number") {
      return Math.floor(Math.random() * arg);
    } else {
      return 4;  // chosen by fair dice roll
    }
  };
});
