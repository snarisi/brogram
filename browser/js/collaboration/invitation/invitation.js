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

            scope.accept = function () {
                const hostId = scope.invitation.host._id;
                const file = scope.invitation.file;
                scope.invitation = null;
                $state.go('main.edit', { host: hostId, file: null, currentFile: file });
            };

            scope.reject = function () {
                scope.from = null;
            }
        }
    }
})
