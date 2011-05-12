var http = require('http');
var time = require("./time.js");
var upc  = require("./upc.js");
var port = 80;

var epoch_pat = new RegExp("^/epoch|time/[0-9]+$");
var upc_pat   = new RegExp("^/upc/[0-9]{12}$");
var chart_pat = new RegExp("^/chart/([0-9]+\\/?)+$");

http.createServer(function (req, res) {
    var param, obj, url, data, i, str;

    res.writeHead(200, {'Content-Type': 'text/plain'} );

    if (req.method == "GET") {
        if (epoch_pat.test(req.url)) {
            param = parseInt(req.url.split("/")[2], 10);
            obj = time.getObject(param);
        } else if (upc_pat.test(req.url)) {
            param = req.url.split("/")[2];
            obj = upc.getObject(param);
        } else if (chart_pat.test(req.url)) {
            param = req.url.split("/")[2];
            data = [];
            for(i = 2; i < param.length; i++) {
                data.push(param[i]);
                str = chart.getSparkle(data);
            }
        }
    }
    
    if (obj) {
        res.end(JSON.stringify(obj));
    } else if (str) {
        res.end(str);
    } else {
        res.end("OK\n");
    }

}).listen(port);
