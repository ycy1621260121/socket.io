//const io = require('socket.io')(server);
// clientCount = 0;
// io.on('connection', function(socket) {
// 	socket.on('online', function(data) {
// 		clientCount++;
// 		io.emit('clientNum', clientCount);
// 		socket.headImg = data
// 		io.emit('online', data)
// 		console.log('user:' + socket.drawerUsername + 'connected!')
// 	})
// 	socket.on('msg', function(data) {
// 		io.emit('broadcastMsg', data);
// 		console.log(JSON.stringify(data) + "发消息了")
// 	})

// 	socket.on('disconnect', function() {
// 		clientCount--;
// 		io.emit('clientNum', clientCount);
// 		socket.broadcast.emit('offline', socket.drawerUsername);
// 		console.log(socket.drawerUsername + '下线了~')
// 	})
// })


/*
 *function中的socket为每个客户端单独连接的socket实例，只通知当前连接用户
 *io.sockets 通知所有连接用户
 *socket.broadcast 给除了自己以外的客户端广播消息
 */
var express = require('express');
const request = require('request');
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var PORT = 8081;

//app.listen(PORT);

// io.on('connection', function (socket) {
//     for(let i=0; i<100; i++){
//         setTimeout(()=>{
// 			io.emit('progress',i+1);
//             //console.log("当前进度为",i+1);
//         },300*i)
//     }
// })
io.on('connection', function(socket) {
	let outtext = '';
	app.get('/setData', function(req, res) {
		let str = req.query.username;
		outtext =str;
		io.emit('progress', str);
	});
	setTimeout(()=>{
		if(outtext == ''){
			io.emit('progress', '没有数据');
		}
	},300)
})
server.listen(PORT, '192.168.1.4')
