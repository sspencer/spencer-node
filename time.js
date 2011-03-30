exports.getObject = function(ts) {
    var t = new Date(ts * 1000);
    return {
          year:      t.getFullYear()
        , month:     t.getMonth()+1
        , day:       t.getDate()
        , hour:      t.getHours()
        , minute:    t.getMinutes()
        , second:    t.getSeconds()
        , timestamp: ts
    };
};
