app.directive('textEditor', function (File) {
    return {
        restrict: 'E',
        templateUrl: 'js/texteditor/texteditor.html',
        link: function (scope, element, attrs) {
            scope.save = function (file) {
                File.save(file)
                    .then(file => {
                        console.log('file: ', file)
                        scope.currentFile = file;
                    })
            }
        }
    }
});
