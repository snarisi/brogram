app.config(function ($stateProvider) {
    $stateProvider.state('main.edit', {
        url: 'edit?file?host',
        templateUrl: 'js/texteditor/texteditor.html',
        controller: 'EditorCtrl',
        resolve: {
            currentFile: function ($stateParams, File) {
                if ($stateParams.file) return File.fetchById($stateParams.file);
                else if ($stateParams.host) return;
                else return;
            }
        }
    });

});

app.controller('EditorCtrl', function ($scope, $state, $stateParams, currentFile, File, socket, loggedInUser) {
    $scope.currentFile = currentFile || { user: loggedInUser._id };

    if ($stateParams.host) {
        socket.joinRoom($stateParams.host);
    }

    socket.trackFile(file => {
        $scope.currentFile = file
        $scope.$digest();
    });

    $scope.$watch('currentFile.text', function (newVal, oldVal) {
        socket.updateFile($scope.currentFile);
    });

    $scope.save = function (file) {
        File.save(file)
            .then(file => {
                if (currentFile) return;
                //redirect if save was called on a new file
                $state.go('main.edit', { file: file._id })
            })
    }
});
