app.config(function ($stateProvider) {
    $stateProvider.state('shared', {
        url: '/shared?file',
        templateUrl: 'js/texteditor/texteditor.html',
        controller: 'SharedCtrl',
        resolve: {
            file: function ($stateParams, File) {
                return File.fetchById($stateParams.file);
            }
        }
    });
});

app.controller('SharedCtrl', function ($scope, socket, file) {
    console.log('in shared view');
    $scope.currentFile = file;

    socket.on('fileUpdate', function (newText) {
        console.log('file is updating');
        $scope.currentFile.text = newText;
        $scope.$digest();
    });
});
