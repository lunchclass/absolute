var http = require('http');
var https = require('https');
var express = require('express');
var app = express();
var fs = require('fs');
var router = express.Router('caseSensitive');

// CERTI_FILE FOR HTTPS
var options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};

var client_address;
var client_type;

app.use(router);

// NOMS DB
const noms = require('@attic/noms');
const db = noms.DatabaseSpec.parse('http://localhost:8000').database();
let ds = db.getDataset('absolute_main');

// Print Commit List
var query_commit_list = function (commit, index, query_pool, msg_list, res) {
    return new Promise(function (resolve) { 
    if (commit.parents.isEmpty()) {
        Promise.all(query_pool).then(console.log(msg_list.toString()),
                                     res.send("<!DOCTYPE html><html><head>TEST</head><body>" + 
                                              msg_list.toString() 
                                              + "</body></html>)"));
        resolve("success");
        return;
    }
    var query = commit.value.get(0).then(r => msg_list[index] = r.address + ": " + r.message + "</br>");
    msg_list.push('');
    query_pool.push(query);
        
    commit.parents.first().
        then(r => r.targetValue(db).
        then(c => query_commit_list(c, index + 1, query_pool, msg_list, res)));
    });         
};
// REQ & RESP
router.get('/', function (req, res) {
	client_type = req.headers['user-agent'];
	client_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	client_message = "TEST";
	
	let data = new noms.List([
        noms.newStruct('', {
        address: client_address,
        type: client_type,
        message: client_message
        })
    ]);

    db.commit(ds, data).
        then(r => ds = r).
        then(ds.head().then(r => query_commit_list(r, 0, new Array(1), new Array(1), res).
        then(function (r) {res.send(r);})));
});

// HTTPS SERVER
https.createServer(options, app).listen(443, function() {
    console.log("Https server listening on port 443");
});
