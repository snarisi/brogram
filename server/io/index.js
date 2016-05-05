'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    const users = {};
    let currentFile = {};
    let room;

    io.on('connection', function (socket) {
        socket.on('disconnect', function () {
            delete users[socket.id];
            io.emit('newUsers', users);
        });

        socket.on('logged in', function (user) {
            users[socket.id] = user.username;
            io.emit('newUsers', users);
        })

        socket.on('typing', function (newFile) {
            currentFile = newFile;
            socket.broadcast.to(room).emit('other user typing', newFile);
        });

        // TODO send the file here
        socket.on('send invite', function (userToInvite) {
            room = socket.id;
            socket.join(room);
            socket.broadcast.to(userToInvite).emit(
                'invitation sent', { host: socket.id, file: currentFile }
            );
        });

        socket.on('join room', function (roomId) {
            roomId = '/#' + roomId;
            socket.join(roomId);
            socket.broadcast.to(socket.id).emit(currentFile);
        });

    });

    return io;

};
