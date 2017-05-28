var assert = require("assert"); // assert module is supported from nodejs.
const execSync = require('child_process').execSync;

describe('Module check', function(){
	it('Is mongo db installed?', function() {
		execSync('./third_party/mongodb/bin/mongod -version', function(err, stdout, stderr){
			if(err) assert(false);
			else assert(true);
		});
	});

	it('Is node installed?', function() {
		execSync('./third_party/node/bin/node -v', function(err, stdout, stderr){
			if(err) assert(false);
			else assert(true);
		});
	});

	it('Is npm installed?', function() {
		execSync('./third_party/node/bin/npm -v', function(err, stdout, stderr){
			if(err) assert(false);
			else assert(true);
		});
	});
});


/*
describe('Array test', function(){
	describe('indexOf() method', function(){
		it('if it is not result, -1 was returned', function() {
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		});
	});
});
*/