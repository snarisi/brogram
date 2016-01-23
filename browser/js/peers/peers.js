app.directive('connectedPeers', function (peer) {
    return {
        restrict: 'E',
        templateUrl: 'js/peers/peers.html',
        scope: {
            peers: '=',
            host: '=',
            file: '='
        },
        link: function (scope, element, attrs) {
            console.log(scope.host);
            scope.invite = function (guestId, host) {
                console.log(host);
                peer.startConnection(guestId, host, scope.file);
            }
        }
    }
})
