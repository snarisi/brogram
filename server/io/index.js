'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    const users = {};
    let currentFile = {};

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

        socket.on('send invite', function (userToInvite) {
            room = socket.id;
            socket.join(room);
            socket.broadcast.to(userToInvite).emit('invitation sent', socket.id);
        });

        socket.on('join room', function (roomId) {
            roomId = '/#' + roomId;
            socket.join(roomId);
            console.log('connected sockets ', io.connected);
        });

        //
        // socket.on('invite', function (id) {
        //     socket.broadcast.to(id).emit('invitation', socket.id);
        // });
        //
        // socket.on('join room', function (roomId) {
        //     console.log('room id from client: ', roomId);
        //     roomId = '/#' + roomId;
        //     console.log('socket ' + socket.id + 'wants to join room ' + roomId);
        //     // io.to(socket.id).emit('fileUpdate', currentFile);
        //     room = roomId;
        //     socket.join(roomId);
        // });

    });

    return io;

};
