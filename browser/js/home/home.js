app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser();
            }
        },
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function ($scope, AuthService, $state, user) {
    $scope.user = user;
});
