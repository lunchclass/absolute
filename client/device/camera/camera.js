(function (window) {
  /**
   * input tag to call camera app.
   */
  var cameraInput = document.createElement('input');

  /**
   * Set correct image orientation.
   */
  var resetOrientation = function (imgSrc, file, orientation, callback) {
    var img = new Image();
    img.onload = function () {
      var width = 600;
      var height = 0;
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var rate = 0;

      if (img.width > img.height) {
        rate = img.width / img.height;
        height = width / rate;
      } else {
        rate = img.height / img.width;
        height = width * rate;
      }

      if (orientation >= 5 && orientation <= 8) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      switch (orientation) {
      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
      case 7: ctx.transform(0, -1, -1, 0, height, width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
      default: ctx.transform(1, 0, 0, 1, 0, 0);
      }

      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas, file);
    };
    img.src = imgSrc;
  };

  /**
   * Get orientation value from captured image.
   */
  var getOrientation = function (file, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var view = new DataView(e.target.result);
      var length = null;
      var offset = null;
      var marker = null;
      var little = null;
      var tags = null;
      var i = null;

      if (view.getUint16(0, false) !== 0xFFD8) {
        return callback(-2);
      }
      length = view.byteLength;
      offset = 2;
      while (offset < length) {
        marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xFFE1) {
          offset += 2;
          if (view.getUint32(offset, false) !== 0x45786966) {
            return callback(-1);
          }

          little = view.getUint16(offset += 6, false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          tags = view.getUint16(offset, little);
          offset += 2;

          for (i = 0; i < tags; i += 1) {
            if (view.getUint16(offset + (i * 12), little) === 0x0112) {
              return callback(view.getUint16(offset + (i * 12) + 8, little));
            }
          }
        /*eslint-disable */
        } else if ((marker & 0xFF00) !== 0xFF00) {
        /*eslint-enable */
          break;
        } else {
          offset += view.getUint16(offset, false);
        }
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file);
  };

  /**
   * API for control user mobile camera device.
   */
  var camera = {
    /**
     * Get image from camera.
     * This function should be called from user action.
     */
    getImageFromCamera(callback) {
      cameraInput.onchange = function (onchangeEvent) {
        var files = onchangeEvent.target.files;
        if (files && files.length > 0) {
          getOrientation(files[0], function (orientation) {
            var fileReader = new FileReader();
            fileReader.onload = function (onloadEvent) {
              resetOrientation(onloadEvent.target.result, files[0], orientation, callback);
            };
            fileReader.readAsDataURL(files[0]);
          });
        }
      };
      cameraInput.click();
    },
  };

  cameraInput.setAttribute('type', 'file');
  cameraInput.setAttribute('capture', 'camera');
  cameraInput.setAttribute('accept', 'image/*');

  window.camera = camera;
}(window));
