app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'MainCtrl',
        resolve: {
            user: function (AuthService) {
                console.log('running');
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.controller('MainCtrl', function ($scope, user) {
    $scope.currentFile = {
        user: user._id
    };
});
