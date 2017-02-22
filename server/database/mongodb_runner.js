var spawn = require('child_process').spawn;

function run() {
  var prc = spawn('mongod',  ['--config', '../database/mongod.cfg']);

  prc.stdout.on('data', function (data) {
    printLog(data);
  });
  prc.stderr.on('data', function (data) {
    printLog(data);
  });

  prc.on('exit', function (code) {
    console.log('mongodb exit code ' + code);
  });
}

function printLog(data) {
  var str = data.toString();
  var lines = str.split(/(\r?\n)/g);
  console.log(lines.join(""));
}

exports.run = run;
