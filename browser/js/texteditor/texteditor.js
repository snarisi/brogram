app.config(function ($stateProvider) {
    $stateProvider.state('main.edit', {
        url: 'edit?file?host',
        templateUrl: 'js/texteditor/texteditor.html',
        controller: 'EditorCtrl',
        params: {
            currentFile: null
        },
        resolve: {
            currentFile: function ($stateParams, File) {
                if ($stateParams.currentFile) return $stateParams.currentFile;
                if (!$stateParams.file) return;
                return File.fetchById($stateParams.file);
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
        if (!newVal) return;
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
