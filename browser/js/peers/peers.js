app.directive('connectedPeers', function (peer) {
    return {
        restrict: 'E',
        templateUrl: 'js/peers/peers.html',
        scope: {
            peers: '=',
            file: '='
        },
        link: function (scope, element, attrs) {
            scope.invite = function (guestId) {
                console.log(guestId);
                peer.startConnection(guestId, scope.file);
            }
        }
    }
})
