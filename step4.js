var cluster = require('cluster');
var crypto = require('crypto');  
var express = require('express');  
var sleep = require('sleep');  
var numCPUs = require('os').cpus().length;

process.execArgv[0] = process.execArgv[0].replace('-brk', '');

console.log('cluster:'+cluster.isMaster);
if (cluster.isMaster) {
    // 클러스터 워커 프로세스 포크
    for (var i = 0; i < numCPUs; i++) {
        console.log('cpu ' + i + ' fork');
        var worker = cluster.fork();
    }
 
    cluster.on('online', function (worker) {
        console.log('worker online : ' + worker.process.pid);
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker exit ' + worker.process.pid);
    });
} else if (cluster.isWorker) {
    console.log('worker:' + process.pid);
    var app = express();

    app.get('/test', function(req, res) {
        console.log('pid:' + process.pid);
        test();
        res.send(req.body);
    });

    // All workers use this port
    app.listen(3000);
}

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
