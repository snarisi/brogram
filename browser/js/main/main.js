app.config(function ($stateProvider) {
    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'js/main/main.html',
        controller: 'MainCtrl',
        resolve: {
            loggedInUser: function (AuthService, socket) {
                return AuthService.getLoggedInUser()
                    .then(user => {
                        socket.logIn({ username: user.email, id: socket.id });
                        return user;
                    })
            }
        }
    });
})

app.controller('MainCtrl', function ($scope, $rootScope, socket, loggedInUser) {
    $scope.user = loggedInUser;
    $scope.incomingInvitation = null;

    $scope.allUsers = {
        0: 'none yet'
    };

    socket.trackUsers(function (users) {
        $scope.allUsers = users;
        $scope.$digest();
    });

    socket.listenForInvites(function (id) {
        $scope.incomingInvitation = id;
        $scope.$digest();
    });
});
