app.directive('rightSidebar', function (socket) {
    return {
        restrict: 'E',
        templateUrl: 'js/right-sidebar/right.html',
        link: function (scope, element, attrs) {
            console.log(scope.users);

            scope.expand = function () {
                if (element.css('right') === '0px') {
                    element.css('right', '-150px');
                } else {
                    element.css('right', '0');
                }
            }

            scope.invite = function (id) {
                console.log('inviting ', id);
                socket.emit('inviteUser', id);
            }
        }
    }
})
