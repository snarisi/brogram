app.directive('textEditor', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/texteditor/texteditor.html',
        link: function (scope, element, attrs) {
            scope.save = function (file) {
                console.log('file: ', file)
            }
        }
    }
});
