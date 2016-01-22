'use strict';
var socketio = require('socket.io');
var io = null;

const users = {};

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
        console.log('socket connect: ', socket.id)

        socket.on('disconnect', function () {
            delete users[socket.id];
            io.emit('newUser', users);
        });

        socket.on('logged on', function (user) {
            users[socket.id] = user.username;
            console.log(users);
            io.emit('newUser', users);
        })

        socket.on('fileUpdate', function (data) {
            socket.broadcast.emit('fileUpdate', data);
        });

        socket.on('inviteUser', function (id) {
            socket.broadcast.to(id).emit('invite');
        });
    });

    return io;

};
