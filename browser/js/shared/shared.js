app.config(function ($stateProvider) {
    $stateProvider.state('shared', {
        url: '/shared?socketId',
        templateUrl: 'js/texteditor/texteditor.html',
        controller: 'SharedCtrl',
        // resolve: {
        //     file: function ($stateParams, File) {
        //         return File.fetchById($stateParams.file);
        //     }
        // }
    });
});

app.controller('SharedCtrl', function ($scope, $stateParams, socket, file) {
    console.log('in shared view');
    $scope.currentFile = file;

    socket.trackFile(function (newText) {
        console.log('file is updating');
        $scope.currentFile.text = newText;
        $scope.$digest();
    });
});
