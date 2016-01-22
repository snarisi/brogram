app.config(function ($stateProvider) {
    $stateProvider.state('files', {
        url: '/files',
        templateUrl: 'js/user/files/user-files.html',
        resolve: {
            files: function (AuthService, File) {
                return AuthService.getLoggedInUser()
                    .then(user => File.fetchAllByUser(user._id))
            },

        },
        controller: 'FilesCtrl'
    });
});

app.controller('FilesCtrl', function ($scope, files, File) {
    $scope.files = files;
});
