var PeerServer = require('peer').PeerServer;
var express = require('express');
var socketio = require('socket.io');
var mongoose = require('mongoose');
// var User = mongoose.model('User');
var EventEmitter = require('events').EventEmitter;

var app = express();

var server = new PeerServer({
        port: process.env.HANDSHAKE_PORT || 8080,
        path: '/api/peer',
        debug: true,
        allow_discovery: true
});
//
// var ioserver = require('http').Server(app);
// var io = socketio(ioserver);
// var users = {};

server.on('connection', function (id) {
    console.log(id);
    // User.findById(id)
    //     .then(user => console.log(user));
});

app.get('/api/connected', function (req, res, next) {
    console.log('connected peers');
});
