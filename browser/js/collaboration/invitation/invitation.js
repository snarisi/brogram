app.directive('invitation', function ($state) {
    return {
        restrict: 'E',
        scope: {
            from: '='
        },
        templateUrl: 'js/collaboration/invitation/invitation.html',
        link: function (scope, element, attrs) {
            let host;

            scope.accept = function () {
                host = scope.from.slice(2);
                scope.from = null;
                $state.go('main.edit', { host: host, file: null });
            };

            scope.reject = function () {
                scope.from = null;
            }
        }
    }
})
