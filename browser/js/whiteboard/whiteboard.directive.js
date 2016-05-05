app.directive('whiteboard', function (peer) {
    return {
        restrict: 'E',
        templateUrl: 'js/whiteboard/whiteboard.html',
        scope: {},
        link: function (scope, element, attrs) {
            var drawing = false;
            const canvas = element.find('canvas')[0];
            const ctx = canvas.getContext('2d');

            //
            const style = getComputedStyle(document.getElementById('board'));
            canvas.width = parseInt(style.getPropertyValue('width'), 10);
            canvas.height = parseInt(style.getPropertyValue('height'), 10);

            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            scope.color = 'black';

            const currentMousePosition = {
                x: 0,
                y: 0
            };

            const lastMousePosition = {
                x: 0,
                y: 0
            };

            const draw = function (start, end, color) {
                if (!start && !end) return scope.clearWhiteboard();

                ctx.lineWidth = color === 'white' ? 15 : 5;
                ctx.beginPath();
                ctx.strokeStyle = color || 'black';
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(end.x, end.y);
                ctx.closePath();
                ctx.stroke();
            };

            canvas.addEventListener('mousedown', e => {
                drawing = true;
                currentMousePosition.x = e.offsetX;
                currentMousePosition.y = e.offsetY;
            });

            canvas.addEventListener('mouseup', () => {
                drawing = false;
            });

            canvas.addEventListener('mousemove', e => {
                if (!drawing) return;

                lastMousePosition.x = currentMousePosition.x;
                lastMousePosition.y = currentMousePosition.y;

                currentMousePosition.x = e.offsetX;
                currentMousePosition.y = e.offsetY;

                peer.sendDrawing(lastMousePosition, currentMousePosition, scope.color);
                draw(lastMousePosition, currentMousePosition, scope.color);
            });

            peer.getDrawing(function (start, end, color) {
                draw(start, end, color);
            });

            scope.clearWhiteboard = function () {
                peer.sendDrawing(null);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            };
        }
    }
})
