app.factory('socket', function () {
    if (!window.io) throw new Error('socket.io not found!');
    const socket = window.io(window.location.origin);

    socket.on('invite', function () {
        console.log('yay i\'ve been invited');
    });

    return socket;
});
