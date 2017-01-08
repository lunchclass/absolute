(function() {
  var assert = require("assert"),
    plus = require("../lib/plus");
  suite("plus", function() {
    test("2 plus 3 should equals 5", function() {
      return assert.equal(5, plus(2, 3));
    });
  });
}).call(this);
