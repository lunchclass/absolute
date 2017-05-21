var fs = require('fs');
var path_bin = './third_party/node/bin';
var path_node = './third_party/node/bin/node';
var path_npm = './third_party/node/bin/npm';

function test_sync_node() {
  if(fs.existsSync(path_bin)){
	console.log("it is existed" + path_bin);
  }else{
	console.log("it is not exist");
  }

  if(fs.existsSync(path_node)){
	console.log("it is existed" + path_node);
  }else{
	console.log("it is not exist");
  }

  if(fs.existsSync(path_npm)){
	console.log("it is existed" + path_npm);
  }else{
	console.log("it is not exist");
  }
}

module.exports.test_sync_node = test_sync_node;


