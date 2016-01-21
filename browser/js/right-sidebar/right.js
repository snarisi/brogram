app.directive('rightSidebar', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/right-sidebar/right.html',
        link: function (scope, element, attrs) {
            scope.expand = function () {
                if (element.css('right') === '0px') {
                    element.css('right', '-150px');
                } else {
                    element.css('right', '0');
                }
            }
        }
    }
})
