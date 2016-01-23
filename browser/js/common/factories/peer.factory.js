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

        startConnection: function (guestId) {
            conn = peer.connect(guestId);
            conn.on('open', function () {
                console.log('open: ', conn);  

                conn.on('data', function (data) {
                    $rootScope.$broadcast('new data', data);
                    console.log('Received ', data);
                });

                $rootScope.$on('send data', function (data) {
                    conn.send(data);
                });

            })
        },

        listenForConnections: function () {
            peer.on('connection', function (conn) {
                console.log(conn);
            })
        },

        sendData: function (data) {
            $rootScope.$broadcast('send data', data);
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
