app.directive('rightSidebar', function (socket) {
    return {
        restrict: 'E',
        templateUrl: 'js/right-sidebar/right.html',
        link: function (scope, element, attrs) {

            scope.expand = function () {
                if (element.css('right') === '0px') {
                    element.css('right', '-150px');
                } else {
                    element.css('right', '0');
                }
            }

            scope.invite = function (id) {
                socket.invite(id);
            }

            socket.listenForInvites();
        }
    }
})
