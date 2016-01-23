const PeerServer = require('peer').PeerServer;
const express = require('express');

const app = express();

const server = new PeerServer({
        port: process.env.HANDSHAKE_PORT || 8080,
        path: '/api/peer',
        debug: true,
        allow_discovery: true
    });

server.on('connection', function (id) {
    console.log(id);
});

server.on('request', app);

app.get('/api/connected', function (req, res, next) {
    console.log('connected peers');
});
