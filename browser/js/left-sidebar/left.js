app.directive('leftSidebar', function () {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'js/left-sidebar/left.html',
        link: function (scope, element, attrs) {
            scope.expand = function () {
                if (element.css('left') === '0px') {
                    element.css('left', '-150px');
                } else {
                    element.css('left', '0');
                }
            }
        }
    }
})
