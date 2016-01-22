app.directive('invitation', function ($state) {
    return {
        restrict: 'E',
        scope: {
            invitation: '='
        },
        templateUrl: 'js/collaboration/invitation/invitation.html',
        link: function (scope, element, attrs) {
            let host,
                file;

            console.log(scope.invitation);

            scope.accept = function () {
                host = scope.invitation.host.slice(2);
                file = scope.invitation.file;
                scope.invitation = null;
                $state.go('main.edit', { host: host, file: null, currentFile: file });
            };

            scope.reject = function () {
                scope.from = null;
            }
        }
    }
})
