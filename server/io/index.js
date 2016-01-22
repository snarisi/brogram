'use strict';
var socketio = require('socket.io');
var io = null;

const users = {};

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
        socket.on('disconnect', function () {
            delete users[socket.id];
            io.emit('newUsers', users);
        });

        socket.on('logged in', function (user) {
            users[socket.id] = user.username;
            console.log('current users: ', users);
            io.emit('newUsers', users);
        })

        socket.on('fileUpdate', function (data) {
            socket.broadcast.emit('fileUpdate', data);
        });

        socket.on('invite', function (id) {
            socket.broadcast.to(id).emit('invitation', socket.id);
        })
    });

    return io;

};
