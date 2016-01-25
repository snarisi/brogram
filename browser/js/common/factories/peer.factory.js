app.factory('peer', function ($rootScope, $http) {
    let peer,
        conn,
        hostCall,
        guestCall;

    // compitability check
    navigator.getUserMedia = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia;


    return {
        creatPeer: function (host) {
            // peer = peer || new Peer(hostId, { key: 'kjig9xjh0zwu3di' });
            peer = peer || new Peer(
                host._id,
                {
                     host: window.location.hostname,
                     port: 8080,
                     path: '/api/peer',
                 });

                 // listen for incoming requests
                 peer.on('connection', function (conn) {

                     $rootScope.$broadcast('invitation received', conn.metadata);

                     conn.on('data', function (data) {
                         if (data.drawing) $rootScope.$broadcast('drawing received', data.drawing);
                         else $rootScope.$broadcast('data received', data);
                     });

                     $rootScope.$on('invitation accepted', function () {

                         // accept incoming data after invitation is accepted
                         conn.on('data', function (data) {
                             if (data.drawing) $rootScope.$broadcast('drawing received', data.drawing);
                             else $rootScope.$broadcast('data received', data);
                         });

                     });

                     $rootScope.$on('send data', function (e, data) {
                         conn.send(data);
                     });

                     $rootScope.$on('send drawing', function (e, start, end, color) {
                         conn.send({
                             drawing: {
                                 start: start,
                                 end: end,
                                 color: color
                             }
                         })
                     });
                 });
        },

        startConnection: function (guestId, host, file) {
            conn = peer.connect(guestId, { metadata: { host: host, file: file } });
            conn.on('open', function () {
                $rootScope.$broadcast('guest connected', guestId)
                // listen for data from guest
                conn.on('data', function (data) {
                    if (data.drawing) $rootScope.$broadcast('drawing received', data.drawing);
                    else $rootScope.$broadcast('data received', data);
                });

                // send data to guest
                $rootScope.$on('send data', function (e, data) {
                    conn.send(data);
                });

                $rootScope.$on('send drawing', function (e, start, end, color) {
                    conn.send({
                        drawing: {
                            start: start,
                            end: end,
                            color: color
                        }
                    })
                });
            })
        },

        onInvitation: function (callback) {
            $rootScope.$on('invitation received', (e, invitation) => callback(invitation));
        },

        acceptInvitation: function () {
            $rootScope.$broadcast('invitation accepted')
        },

        sendData: function (data) {
            $rootScope.$broadcast('send data', data);
        },

        onData: function (callback) {
            $rootScope.$on('data received', function (e, data) {
                callback(data);
            })
        },

        getConnectPeers: function (callback) {
            return peer.listAllPeers(peers => {
                peers = peers.filter(otherPeer => otherPeer !== peer.id)
                return $http({
                    method: 'GET',
                    url: '/api/users',
                    params: {
                        userIds: peers
                    }
                })
                .then(res => callback(res.data))
            })
        },

        onGuestConnect: function (callback) {
            $rootScope.$on('guest connected', function (e, data) {
                callback(data);
            });
        },

        startVideoChat: function (guestId, stream, callback) {
            const call = peer.call(guestId, stream);
            call.on('end', () => $rootScope.$broadcast('call ended'));
            $rootScope.$on('end call', () => call.close());
            callback(call);
        },

        endCall: function () {
            $rootScope.$broadcast('end call');
        },

        answerVideo: function (callback) {
            peer.on('call', function (call) {
                navigator.getUserMedia({ audio: true, video: true }, guestStream => {
                    call.answer(guestStream);
                    callback(call);
                    call.on('end', () => $rootScope.$broadcast('call ended'));
                    $rootScope.$on('end call', () => call.close());
                }, err => console.error(err));
            });
        },

        sendDrawing: function (start, end, color ) {
            $rootScope.$broadcast('send drawing', start, end, color);
        },

        getDrawing: function (callback) {
            $rootScope.$on('drawing received', function (e, drawing) {
                callback(drawing.start, drawing.end, drawing.color);
            });
        },

        onEnd: function (callback) {
            $rootScope.$on('call ended', () => callback());
        }
    }
})
