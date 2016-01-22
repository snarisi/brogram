app.factory('socket', function () {
    if (!window.io) throw new Error('socket.io not found!');
    const socket = window.io(window.location.origin);

    return {
        logIn: function (userInfo) {
            socket.emit('logged in', userInfo)
        },

        trackUsers: function (callback) {
            socket.on('newUsers', function (allUsers) {
                const otherUsers = Object.keys(allUsers)
                .filter(id => id.slice(2) !== socket.id)
                .map(id => ({ id: id, username: allUsers   [id] }));
                callback(otherUsers);
            });
        },

        updateFile: function (newText) {
            socket.emit('updateFile', newText);
        },

        trackFile: function (callback) {
            socket.on('fileUpdate', function (newText) {
                callback(newText);
            });

        },

        invite: function (socketId) {
            socket.emit('invite', socketId);
        },

        listenForInvites: function () {
            socket.on('invitation', function (id) {
                console.log('yay, ' + id + ' invited me to join a room');
            })
        },

        join: function (roomId) {
            socket.emit('join room', roomId)
        }

    }
});
