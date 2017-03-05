(function (global, factory) {
  /**
   * Set correct image orientation.
   */
  /*eslint-disable */
  global.order = new factory(global, global.document)();
  /*eslint-enable */
}(typeof window !== 'undefined' ? window : this, function (w, d) {
  var order = function () {
    var self = this;
    /**
     * Not implementation
     */
    function sendOrder() {
      /**
       * Not implementation
       */
    }
    self.order = function (json) {
      /**
       * Not implementation
       */
      sendOrder(json);
    };
  };
  return order;
}));
