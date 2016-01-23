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
                 });

                 // listen for incoming requests
                 peer.on('connection', function (conn) {

                     $rootScope.$broadcast('invitation received', conn.metadata);

                     conn.on('data', function (data) {
                         console.log('received: ', data);
                         $rootScope.$broadcast('data received', data);
                     });

                     $rootScope.$on('invitation accepted', function () {

                         conn.on('data', function (data) {
                             console.log('received: ', data);
                             $rootScope.$broadcast('data received', data);
                         });

                     });

                     $rootScope.$on('send data', function (e, data) {
                         conn.send(data);
                     });
                 });
        },

        startConnection: function (guestId, host, file) {
            conn = peer.connect(guestId, { metadata: { host: host, file: file } });
            conn.on('open', function () {

                // listen for data from guest
                conn.on('data', function (data) {
                    $rootScope.$broadcast('data received', data);
                });

                // send data to guest
                $rootScope.$on('send data', function (e, data) {
                    conn.send(data);
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
        }
    }
})
