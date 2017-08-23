var cluster = require('cluster');

process.execArgv[0] = process.execArgv[0].replace('-brk', '');

if (cluster.isMaster) {
    console.log('master');
    //워커 생성
    var worker = cluster.fork();

    //생성한 워커가 보내는 메시지 처리
    worker.on('message', function (message) {
        console.log('마스터가 ' + worker.process.pid + ' 워커로부터 받은 메시지 : ' + message);
    });

    //생성한 워커에게 메시지 보내기
    worker.send('마스터가 보내는 메시지');
}

if (cluster.isWorker) {
    console.log('worker');
    //마스터가 보낸 메시지 처리
    process.on('message', function(message) {
        console.log('워커가 마스터에게 받은 메시지 : ' + message);
    });

    //마스터에게 메시지 보내기
    process.send(process.pid + ' pid 를 가진 워커가 마스터에게 보내는 메시지');
}
