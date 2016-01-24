app.directive('videoChat', function (peer) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            // compitability check
            navigator.getUserMedia = navigator.getUserMedia ||
                                     navigator.webkitGetUserMedia ||
                                     navigator.mozGetUserMedia;

            scope.startVideoChat = function (guestId) {
                console.log('starting video chat i guess');
                navigator.getUserMedia({ audio: true, video: true }, hostStream => {
                    peer.startVideoChat(guestId, hostStream, call => {
                        console.log(call);
                        call.on('stream', stream => {
                            const source = URL.createObjectURL(stream);
                            element.prop('src', source);
                        })

                    });
                }, err => console.error(err));
            };

            // navigator.getUserMedia({ audio: true, video: true }, myStream => {
            //
            //     peer.answerVideo(myStream, call => {
            //         call.on('stream', stream => {
            //             const source = URL.createObjectURL(stream);
            //             element.prop('src', source);
            //         })
            //     });
            // }, err => console.error(err))
        }
    }
});
