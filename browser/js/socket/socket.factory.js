app.factory('socket', function () {
    if (!window.io) throw new Error('socket.io not found!');
    const socket = window.io(window.location.origin);

    socket.on('fileUpdate', function (stuff) {
        console.log('file update: ', stuff);
    })

    return {
        logIn: function (userInfo) {
            socket.emit('logged in', userInfo)
        },

        trackUsers: function (callback) {
            socket.on('newUsers', function (allUsers) {
                const otherUsers = Object.keys(allUsers)
                                         .filter(id => id.slice(2) !== socket.id)
                                         .map(id => ({ id: id, username: allUsers[id] }));
                callback(otherUsers);
            });
        },

        updateFile: function (newFile) {
            console.log('i am typing');
            socket.emit('typing', newFile);
        },

        trackFile: function (callback) {
            socket.on('other user typing', function (newFile) {
                console.log('other user is typing: ', newFile.text)
                callback(newFile);
            });

        },

        invite: function (socketId) {
            socket.emit('send invite', socketId);
        },

        listenForInvites: function (callback) {
            socket.on('invitation sent', function (data) {
                console.log('yay, ' + data.host + ' invited me to join a room');
                if (callback) callback(data);
            })
        },

        joinRoom: function (roomId) {
            console.log('roomId on client ', roomId);
            //slice out leading /#, which we'll add back in on the server
            socket.emit('join room', roomId);
        }

    }
});
