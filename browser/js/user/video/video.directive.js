app.directive('videoChat', function (peer, $rootScope, $state) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            // compitability check
            navigator.getUserMedia = navigator.getUserMedia ||
                                     navigator.webkitGetUserMedia ||
                                     navigator.mozGetUserMedia;

            const constraints = {
                audio: true,
                video: {
                    mandatory: {
                        maxHeight: 200,
                    }
                },
            }

            $rootScope.$on('video on', function () {
                navigator.getUserMedia(constraints, hostStream => {
                    $rootScope.$on('video off', () => hostStream.getTracks()[0].stop());
                    peer.startVideoChat(scope.guestId, hostStream, call => {
                        call.on('stream', stream => {
                            const source = URL.createObjectURL(stream);
                            element.prop('src', source);
                        })

                    });
                }, err => console.error(err));
            });

            $rootScope.$on('video off', function () {
                peer.endCall();
            });
            //
            // navigator.getUserMedia(constraints, myStream => {
            //     peer.answerVideo(myStream, function (call) {
            //         call.on('stream', function (stream) {
            //             const source = URL.createObjectURL(stream);
            //             element.prop('src', source);
            //         });
            //     });
            // }, err => console.error(err));
            //
            peer.answerVideo(call => {
                call.on('stream', stream => {
                    const source = URL.createObjectURL(stream);
                    element.prop('src', source);
                })
            });

        }
    }
});
