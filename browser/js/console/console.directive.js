app.directive('console', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/console/console.html',
        scope: {
            currentFile: '='
        },
        link: function (scope, element, attrs) {
            scope.runCode = function (code) {
                code = code.replace(/console.log/gm, 'document.writeln("<pre>"); document.write(">> "); document.writeln');
                const script = '<script>' + code + '</script>';
                element.find('iframe').prop('srcdoc', script);
            }
        }
    }
})
