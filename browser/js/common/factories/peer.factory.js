app.factory('peer', function ($rootScope, $http) {
    let peer,
        conn;

    console.log(peer);

    return {
        creatPeer: function (host) {
            // peer = peer || new Peer(hostId, { key: 'kjig9xjh0zwu3di' });
            peer = peer || new Peer(
                host._id,
                {
                     host: 'localhost',
                     port: 8080,
                     path: '/api/peer',
                     metadata: { username: host.email }
                 });
        },

        startConnection: function (guestId, file) {
            conn = peer.connect(guestId);
            conn.on('open', function () {

                // send peer the current file
                if (file) conn.send(file);

                conn.on('data', function (data) {
                    $rootScope.$broadcast('data received', data);
                });

                $rootScope.$on('send data', function (e, data) {
                    conn.send(data);
                });

            })
        },

        listenForConnections: function () {
            peer.on('connection', function (conn) {
                conn.on('data', function (data) {
                    $rootScope.$broadcast('data received', data);
                });

                $rootScope.$on('send data', function (e, data) {
                    conn.send(data);
                });
            });
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
        }
    }
})
