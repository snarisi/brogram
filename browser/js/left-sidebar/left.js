app.directive('leftSidebar', function ($rootScope, $state, AuthService) {
    return {
        restrict: 'E',
        scope: {
            peers: '=',
            user: '=',
            file: '=',
        },
        templateUrl: 'js/left-sidebar/left.html',
        link: function (scope, element, attrs) {
            scope.expanded = false;
            scope.showFiles = false;
            scope.showPeers = false;

            scope.expand = function () {
                if (scope.showFiles) scope.showFiles = false;
                if (scope.showPeers) scope.showPeers = false;

                if (scope.expanded) element.css('left', '-150px');
                else element.css('left', '0');

                scope.expanded = !scope.expanded;
            };

            scope.toggleFiles = function () {
                if (!scope.showFiles && !scope.expanded) scope.expand();
                scope.showFiles = !scope.showFiles;
            };

            scope.togglePeers = function () {
                if (!scope.showPeers && !scope.expanded) scope.expand();
                scope.showPeers = !scope.showPeers;
            };

            $rootScope.$on('$stateChangeSuccess', function () {
                if (scope.expanded) scope.expand();
                if (scope.showFiles) scope.showFiles = false;
                if (scope.showPeers) scope.showPeers = false;
            })

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

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
