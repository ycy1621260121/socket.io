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
io.on('connection', function(socket) {
	let outtext = {};
	socket.on('message', function(data) {
		console.log(data);
		outtext = data;
		io.sockets.emit('progress', data);
	});
	console.log(outtext);
	if (JSON.stringify(outtext) == '{}') {
		io.emit('progress', '{}');
	}
})
server.listen(PORT, '192.168.199.73')
