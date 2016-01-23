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
            scope.invite = function (guestId, host) {
                peer.startConnection(guestId, host, scope.file);
            }
        }
    }
})
