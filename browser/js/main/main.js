app.config(function ($stateProvider) {
    $stateProvider.state('main', {
        url: '/main/',
        templateUrl: 'js/main/main.html',
        controller: 'MainCtrl',
        resolve: {
            loggedInUser: function (AuthService) {
                return AuthService.getLoggedInUser()
                    .then(user => {
                        if (user) return user;
                        else return { email: 'guest', _id: null };
                    });
            }
        }
    });
})

app.controller('MainCtrl', function ($scope, $rootScope, loggedInUser, peer) {
    $scope.user = loggedInUser;
    $scope.incomingInvitation = null;
    $scope.guestId = null;

    peer.creatPeer($scope.user);
    peer.getConnectPeers(peers => $scope.connectedPeers = peers);
    peer.onInvitation(invitation => {
        $scope.incomingInvitation = invitation;
        $scope.$digest();
    });
    peer.onGuestConnect(guestId => {
        $scope.guestId = guestId;
        $scope.$digest();
    });

    $scope.allUsers = {
        0: 'none yet'
    };
});
