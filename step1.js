var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/test', function(req, res) {
    test(function() {
        console.log('callback');
    });
    res.send(req.body);
});

app.listen(3000, function() {
  console.log("Go!");
});

function test(callback) {
    console.log('111');
    process.nextTick(function() {
        console.log('async function');
        callback();
    });
    console.log('222');
}
