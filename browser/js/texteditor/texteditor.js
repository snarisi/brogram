app.config(function ($stateProvider) {
    $stateProvider.state('edit', {
        url: '/edit?file',
        templateUrl: 'js/texteditor/texteditor.html',
        controller: 'EditorCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser();
            },
            currentFile: function ($stateParams, File) {
                if (!$stateParams.file) return;
                return File.fetchById($stateParams.file);
            }
        }
    });

});

app.controller('EditorCtrl', function ($scope, $state, currentFile, user, File, socket) {
    $scope.currentFile = currentFile || { user: user._id };

    $scope.$watch('currentFile.text', function (newVal, oldVal) {
        socket.updateFile(newVal);
    });

    $scope.save = function (file) {
        File.save(file)
            .then(file => {
                if (currentFile) return;
                //redirect if save was called on a new file
                $state.go('edit', { file: file._id })
            })
    }
});
