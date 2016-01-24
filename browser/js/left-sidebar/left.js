app.directive('leftSidebar', function ($rootScope) {
    return {
        restrict: 'E',
        scope: {
            peers: '=',
            user: '=',
            file: '=',
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

            let videoOn = false;

            scope.toggleVideo = function () {
                console.log('togglin')
                if (!videoOn) $rootScope.$broadcast('video on');
                else $rootScope.$broadcast('video off');

                videoOn = !videoOn;
            }
        }
    }
})
