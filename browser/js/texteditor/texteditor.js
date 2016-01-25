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

app.controller('EditorCtrl', function ($scope, $rootScope, $state, $stateParams, currentFile, File, loggedInUser, peer) {
    $rootScope.currentFile = currentFile || { user: loggedInUser._id };
    $scope.videoOn = false;
    $scope.activePanel = 'console';

    // accept invitation from the host
    if ($stateParams.host) {
        peer.acceptInvitation($stateParams.host);
    }

    // listen to data transmission from peer
    peer.onData(data => {
        $rootScope.currentFile = data;
        $scope.$digest();
    });

    $scope.typeHandler = function ($event) {
        peer.sendData($rootScope.currentFile);
    };

    $scope.save = function (file) {
        File.save(file)
            .then(file => {
                if (currentFile) return;
                //redirect if save was called on a new file
                $state.go('main.edit', { file: file._id })
            })
    };

    $scope.keySave = function ($event, file) {
        if ($event.ctrlKey) {
            $event.preventDefault();
        }
        if ($event.ctrlKey && $event.which === 19) {
            $scope.save(file);
        }
    }
});
