!function ($, jQuery, window, document) {
    'use strict';

    app.module.directive('gameCompass',
        /**
         *
         * @param $window
         * @param {Geolocation} geolocation
         */
        function ($window, geolocation) {
            return {
                restrict: 'E',
                scope: {
                    maxDistance: '=',
                    contests: '=',
                    coordinates: '=',
                    size: '='
                },
                templateUrl: 'appServices/directives/gameCompass.html',
                link: function (scope, element, attrs) {
                    var size = parseInt(attrs.size, 10);
                    var padding = 3;

                    var canvas = element.find('canvas')[0];

                    var devicePixelRatio = $window.devicePixelRatio || 1;
                    canvas.style.width = size + 'px';
                    canvas.style.height = size + 'px';
                    canvas.setAttribute('width', size * devicePixelRatio + 'px');
                    canvas.setAttribute('height', size * devicePixelRatio + 'px');

                    /**
                     * @type {CanvasRenderingContext2D}
                     */
                    var context = canvas.getContext('2d');

                    context.scale(devicePixelRatio, devicePixelRatio);

                    function scheduleRedraw() {
                        $window.requestAnimationFrame(function () {
                            redraw();
                        });
                    }

                    function redraw() {
                        context.clearRect(0, 0, size, size);

                        drawNorth();
                        drawSelf();
                        drawInnerCircles();
                        drawContests();
                    }

                    function drawInnerCircles() {
                        var circleCount = 4;

                        context.save();

                        for (var i = circleCount; i >= 0; i--) {
                            var radius = size / 2 - i * (size / 2 / circleCount) - padding;

                            if (radius < 0) {
                                radius = 0;
                            }

                            context.beginPath();
                            context.arc(size / 2, size / 2, radius, 0, 2 * Math.PI);
                            context.closePath();
                            context.stroke();

                            if (scope.maxDistance && i > 0) {
                                var distance = Math.floor(i * parseInt(scope.maxDistance, 10) / circleCount);
                                var adjustment = distance >= 100 ? 25 : 20;
                                context.fillText(distance, size / 2 + i * (size / 2 / circleCount) - adjustment, size / 2);
                            }
                        }

                        context.restore();
                    }

                    function drawSelf() {
                        context.save();

                        context.beginPath();
                        context.arc(size / 2, size / 2, 15, 0, 2 * Math.PI);
                        context.closePath();
                        context.fill();

                        context.fillStyle = 'white';
                        context.fillText('Ich', size / 2 - context.measureText('Ich').width / 2, size / 2 + 3);

                        context.restore();
                    }

                    function drawContests() {
                        if (!scope.contests || !scope.coordinates) {
                            return;
                        }

                        context.save();
                        context.fillStyle = '#286090';

                        for (var i = 0, ii = scope.contests.length; i < ii; i++) {
                            var contest = scope.contests[i];
                            var contestCoordinates = contest.details.location.coordinates;

                            var bearing = geolocation.calculateBearing({
                                lat: scope.coordinates.latitude,
                                lon: scope.coordinates.longitude
                            }, {
                                lat: contestCoordinates.latitude,
                                lon: contestCoordinates.longitude
                            });

                            var distance = (size/(parseInt(scope.maxDistance, 10))) * (contest.distance) / 2;

                            var newX = size / 2 + distance * Math.sin(bearing);
                            var newY = size / 2 - distance * Math.cos(bearing);

                            console.log(newX, newY);

                            context.beginPath();
                            context.arc(newX, newY, 8, 0, 2 * Math.PI);
                            context.closePath();
                            context.fill();

                            context.save();
                            context.fillStyle = 'white';
                            context.fillText(i + 1, newX - 3, newY + 3);
                            context.restore();
                        }

                        context.restore();

                        console.log(scope.contests);
                    }

                    function drawNorth() {
                        context.save();

                        context.fillText('N', size / 2 - context.measureText('N').width / 2, 14);

                        context.restore();
                    }

                    function watchFn(newVal) {
                        if (newVal) {
                            scheduleRedraw();
                        }
                    }

                    scope.$watch('contests', watchFn);
                    scope.$watch('maxDistance', watchFn);
                    scope.$watch('coordinates', watchFn);
                }
            };
        });
}();
