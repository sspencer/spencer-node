var http = require('http');
var time = require("./time.js");
var upc  = require("./upc.js");
var port = 80;

var epoch_pat = new RegExp("^/epoch|time/[0-9]+$");
var upc_pat   = new RegExp("^/upc/[0-9]{12}$");

http.createServer(function (req, res) {
    var param, obj, url;

    res.writeHead(200, {'Content-Type': 'text/plain'} );

    if (req.method == "GET") {
        if (epoch_pat.test(req.url)) {
            param = parseInt(req.url.split("/")[2], 10);
            obj = time.getObject(param);
        } else if (upc_pat.test(req.url)) {
            param = req.url.split("/")[2];
            obj = upc.getObject(param);
        }
    }
    
    if (obj) {
        res.end(JSON.stringify(obj));
    } else {
        res.end("OK\n");
    }

}).listen(port);
