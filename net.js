var http = require('http');
var url = require('url');
var net = require('net');
var fs = require('fs');
var child_process = require('child_process');
var exec = require('exec');

var serv = net.createServer(function(conn) {
    conn.write('hello\n');
    conn.on('data', function(clientdata) {
        var sock = net.connect(80, 'www.yahoo.com', function() {
            sock.write('GET / HTTP/1.0\r\nHost: www.yahoo.com\r\n\r\n');
            sock.on('data', function(data) {
                console.log(data.toString());               // CWEID 117
                var s = fs.statSync(clientdata.toString());          // CWEID 73
                console.log(s);
            });
        });
        conn.write(JSON.stringify(process.env));            // CWEID 201
        conn.write(JSON.stringify(process.config));         // CWEID 201
        conn.write(os.hostname());                          // CWEID 201
        conn.write(os.type());                              // CWEID 201
        conn.end('\n');
    });
});
serv.listen(1337, '127.0.0.1');
