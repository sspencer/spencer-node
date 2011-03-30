var http = require('http');
var time = require("./time.js");
var port = 80;

var epoch = new RegExp("^/epoch|time/[0-9]+$");

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    if (req.method == "GET" && epoch.test(req.url)) {
        var ts = parseInt(req.url.split("/")[2], 10);
        var obj = time.getObject(ts);
        res.end(JSON.stringify(obj));
    } else {
        res.end("OK\n");
    }
}).listen(port);
