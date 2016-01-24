app.directive('videoChat', function (peer, $rootScope, $state) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            // compitability check
            navigator.getUserMedia = navigator.getUserMedia ||
                                     navigator.webkitGetUserMedia ||
                                     navigator.mozGetUserMedia;

            $rootScope.$on('video on', function () {
                navigator.getUserMedia({ audio: true, video: true }, hostStream => {
                    console.log(hostStream);
                    $rootScope.$on('video off', () => hostStream.getTracks()[0].stop());
                    peer.startVideoChat(scope.guestId, hostStream, call => {
                        console.log(call);
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


            peer.answerVideo(call => {
                console.log(call);
                call.on('stream', stream => {
                    const source = URL.createObjectURL(stream);
                    element.prop('src', source);
                })
            });

        }
    }
});
