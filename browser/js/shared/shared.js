app.config(function ($stateProvider) {
    $stateProvider.state('shared', {
        url: '/shared?socketId',
        templateUrl: 'js/texteditor/texteditor.html',
        controller: 'SharedCtrl',
    });
});

app.controller('SharedCtrl', function ($scope, $stateParams, socket, file) {
    $scope.currentFile = file;

    socket.trackFile(function (newText) {
        $scope.currentFile.text = newText;
        $scope.$digest();
    });
});
