exports.getSparkle = function(data) {
    var min = Math.min.apply({}, data);
    var max = Math.max.apply({}, data);

    var block = ["▁", "▂", "▃","▄", "▅", "▆","▇", "█"];
    var i;
    var chart = [];
    for (i = 0; i < data.length; i++) {
        var n = data[i];
        var d = Math.round((n / ((max-min)/7))) - 1;
        chart.push(block[d]);
    }
    
    return chart.join("");
};
