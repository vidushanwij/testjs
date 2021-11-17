var https = require('https');
var url = require('url');
var child_process = require('child_process');
var util =require('util');
var exec = require('exec');
var cluster = require('cluster');
var vm = require('vm');
var fs = require('fs');

var options = {
  key: fs.readFileSync('ssl-key.pem'),
  cert: fs.readFileSync('ssl-cert.pem')
};


var serv = https.createServer(options);
serv.on('request', function(req, res) {
    console.log(req.headers);                   // CWEID 117
    var h = req.headers;
    console.log(h['user-agent']);             // CWEID 117
    try {
        var fdata = fs.readFileSync(h.host);   // CWEID 73
        var fdata = fs.readFileSync(h['host']);   // CWEID 73
    } catch (e) {
        console.log("exception:" + e);
    }
    console.log('got a request: ' + req.url);   // CWEID 117

    req.on('data', function(d1) {
        var ds = d1.toString();
        console.log(d1.toString());             // CWEID 117
        res.write(d1.toString());               // CWEID 80
        res.write(h["host"]);                   // CWEID 80
        res.write(h.host);                   // CWEID 80
        res.write(encodeURIComponent(d1.toString()));
        console.log(ds);             // CWEID 117
        res.write(ds);              // CWEID 80
        if(ds.indexOf("alksjdflka") != -1) {
            cluster.fork(ds);           // CWEID 78
            cluster.setupMaster(ds);           // CWEID 78
        }
        try {
            fs.mkdirSync(ds);       // CWEID 73
            fs.rmdirSync(ds);       // CWEID 73
            fs.unlink(ds, function() { });          // CWEID 73
            fs.unlinkSync(ds);          // CWEID 73
        } catch (e) {
            console.log("exception:" + e);
            res.write(util.inspect(e));         // CWEID 201
        }
        res.end();
    });
});
serv.listen(8000);
