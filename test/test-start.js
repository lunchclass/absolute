var assert = require("assert"); // assert module is supported from nodejs.

describe('mocha test start', function(){
	console.log("mocha test start");
});


describe('Array test', function(){
	describe('indexOf() method', function(){
		it('if it is not result, -1 was returned', function() {
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		});
	});
});