(function (window) {
  /**
   * Set correct image orientation.
   */
  var resetOrientation = function (imgSrc, orientation, callback) {
    var img = new Image();
    img.onload = function () {
      var width = img.width;
      var height = img.height;
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
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
      ctx.drawImage(img, 0, 0);
      callback(canvas.toDataURL());
    };
    img.src = imgSrc;
  };

  /**
   * Get orientation value from captured image.
   */
  var getOrientation = function (file, callback) {
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
    },
  };

  window.camera = camera;
}(window));
