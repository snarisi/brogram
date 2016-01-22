app.config(function ($stateProvider) {
    $stateProvider.state('main.files', {
        url: 'files',
        templateUrl: 'js/user/files/user-files.html',
        resolve: {
            files: function (loggedInUser, File) {
                return File.fetchAllByUser(loggedInUser._id);
            }

        },
        controller: 'FilesCtrl'
    });
});

app.controller('FilesCtrl', function ($scope, files, File) {
    $scope.files = files;
});
