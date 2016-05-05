app.config(function ($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });
});

app.controller('SignupCtrl', function ($scope, $state, User) {
    $scope.sendNewUser = function (newUser) {
        User.newUser(newUser)
            .then(() => $state.go('main'))
            .then(null, err => $scope.error = err);
    }
});
