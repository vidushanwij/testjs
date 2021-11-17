var http = require('http');
var url = require('url');
var child_process = require('child_process');
var exec = require('exec');
var vm = require('vm');
var fs = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text\n/plain" });
    var u = url.parse(req.url);
    var t ;
    if(req.url.indexOf("ddd") != -1) {
        req.on('readable', function() {
            var ddd = req.read();
            console.log(ddd);           // CWEID 117
            console.log(ddd.toJSON());  // cleansed
            var fdata = fs.readFileSync(ddd.toJSON().data.toString());  // CWEID 73
            util.exec(ddd.toJSON().data.toString());  // CWEID 78
            exec(ddd.toJSON().data.toString());  // CWEID 78
            res.end();
        });
    } else if(req.url.indexOf("ccc") != -1) {
        req.on('readable', function() {
            console.log(u.query);     // CWEID 117
        });
        res.end('\n');
    } else if(req.url.indexOf("aaa") != -1) {
        res.write(req.url);     // CWEID 80
        res.write(u.query);     // CWEID 80
        req.on('readable', function() {
            var d = req.read();

            var buf = new Buffer(100);      // CWEID 665
            res.write(buf);     
            buf.write("hello", 'utf-8');
            res.write(buf);

            var buftwo = new Buffer(Array(100));
            res.write(buftwo);
            buftwo.write("hello", 'utf-8');
            res.write(buftwo);

            var bufthree = new Buffer(buftwo);
            res.write(bufthree);
            bufthree.write("hi", 'utf-8');
            res.write(bufthree);

            var buffour = new Buffer(100);
            buffour.fill();
            res.write(buffour);
            buffour.write('hello', 'utf-8');
            res.write(buffour);

            var buffive = new Buffer(100);
            buffive.fill();
            buffive.write(req.url + "FFF", 'utf-8');
            var bufsix = new Buffer(Array(100));
            buffive.copy(bufsix, 0, 0);
            res.write(buffive);     // CWEID 80
            res.write(url.resolve(buffive.toString()));     // CWEID 80
            res.write(bufsix);     // CWEID 80

            res.write(d.toString().toUpperCase());     // CWEID 80
            res.end(d.toString().toLowerCase() + "\n");    // CWEID 80
        })
    } else if(req.url.indexOf("bbb") != -1) {
        var u = require('url');
        var q = u.parse(req.url, true).query;
        res.write("hi");
        eval(q);                    // CWEID 95
        new Function(q)();          // CWEID 95
        vm.runInThisContext(q);     // CWEID 95
        vm.runInContext(q);     // CWEID 95
        vm.runInNewContext(q);     // CWEID 95
        vm.runInDebugContext(q);     // CWEID 95
        var s = new vm.Script(q);     // CWEID 95
        res.write(JSON.stringify(q) + "\n");
        if(q.cmd) {
            var cmds = q['cmd'].split(" ");
            var cmd = util.format("%s", cmds[0]);
            var child = child_process.spawn(cmd, cmds.slice(1), {       // CWEID 78
            });
            exec(cmds);     // CWEID 78
            child.on("error", function(e) {
                console.log("error occurred while spawning:");
                console.log(e);     // CWEID 312
            });
        }
        if(q.cmd2) {
            util.exec(q['cmd2']);       // CWEID 78
            util.execSync(q['cmd2']);       // CWEID 78
        }
        if(q.cmd3) {
            var cs = q['cmd3'].split(' ');
            var cp = child_process.execFile(cs[0], cs.slice(1));        // CWEID 78
            cp.on("error", function(e) {
                console.log("error occurred while spawning:");
                console.log(e);     // CWEID 312
            });
        }
        if(q.cmd4) {
            var cs = q['cmd4'].split(' ');
            var cp = child_process.fork(cs[0], cs.slice(1));        // CWEID 78
            cp.on("error", function(e) {
                console.log("error occurred while spawning:");
                console.log(e);     // CWEID 312
            });
        }
        if(q.cmd5) {
            var xs = q['cmd5'].split(' ');
            var cp = child_process.spawnSync(xs[0], xs.slice(1));        // CWEID 78
        }
        if(q.cmd6) {
            var ys = q['cmd6'].split(' ');
            var cp = child_process.execFileSync(ys[0], ys.slice(1));        // CWEID 78
        }
        res.end(q['foo']);          // CWEID 80
    } else {
        res.write(req.url);     // CWEID 80
        res.write(u.query);     // CWEID 80
        var v = url.parse('http://www.yahoo.com/foo?bar=baz');
        res.write(v.query);
        req.once('data', function(chunk) {
            console.log("chunk: " + chunk);     // CWEID 117
            res.write(chunk);                   // CWEID 80
            res.end('hi\n');
        });
    } 
}).listen(1337, '127.0.0.1');

