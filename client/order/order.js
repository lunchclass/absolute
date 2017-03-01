(function (global, factory) {
  /**
   * Set correct image orientation.
   */
  /* jshint ignore:start */
  global.order = new factory(global, global.document)();
  /* jshint ignore:end */
}(typeof window !== 'undefined' ? window : this, function (w, d) {
  var order = function () {
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
