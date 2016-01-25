app.directive('console', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/console/console.html',
        scope: {
            currentFile: '='
        },
        link: function (scope, element, attrs) {
            scope.runCode = function (code) {
                console.log(code);
                code = code.replace(/console.log/gm, 'document.writeln("<pre>"); document.write(">> "); document.writeln');
                console.log(code);
                const script = '<script>' + code + '</script>';
                element.find('iframe').prop('srcdoc', script);
            }
        }
    }
})
