app.directive('filelist', function (File) {
    return {
        restrict: 'E',
        templateUrl: 'js/left-sidebar/filelist/filelist.html',
        scope: {
            user: '='
        },
        link: function (scope) {
            scope.files = [];
            
            File.fetchAllByUser(scope.user._id)
                .then(files => scope.files = files);
        }
    }
})
