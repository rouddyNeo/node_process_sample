var express = require('express');
var bodyParser = require('body-parser');
var sleep = require('sleep');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/test', function(req, res) {
    test();
    res.send(req.body);
});

app.listen(3000, function() {
  console.log("Go!");
});

function test() {
    console.log('111');
    process.nextTick(function() {
        for (var i=0; i<10; i++) {
            sleep.sleep(1);
            console.log('first:'+i);
            (function() {
                var j = i;
                process.nextTick(function() {
                    console.log('second:'+j);
                });
            })();
        }
    });
    console.log('222');
}
