app.config(function ($stateProvider) {
    $stateProvider.state('edit', {
        url: '/edit?file',
        templateUrl: 'js/texteditor/texteditor.html',
        controller: 'EditorCtrl',
        resolve: {
            currentFile: function ($stateParams, File) {
                if (!$stateParams.file) return {};
                return File.fetchById($stateParams.file);
            }
        }
    });

});

app.controller('EditorCtrl', function ($scope, $state, currentFile, File) {
    $scope.currentFile = currentFile || { user: $scope.user._id };

    $scope.save = function (fileId) {
        File.save($scope.currentFile)
            .then(file => {
                console.log('from server:', file);
                //redirect if save was called on a new file
                $state.go('edit', { file: file._id })
            })
    }
});
