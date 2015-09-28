(function ($, jQuery) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     *
     * @param $window
     * @param $q
     * @param $http
     */
    function Geolocation($window, $q, $http) {
        function toDegrees(radiants) {
            return radiants * 180 / Math.PI;
        }

        function toRadiants(degrees) {
            return degrees * Math.PI / 180;
        }

        this.getCoordinatesFromSensor = function () {
            var deferred = $q.defer();

            if ($window.navigator && $window.navigator.geolocation) {
                $window.navigator.geolocation.getCurrentPosition(function (position) {
                    deferred.resolve(position.coords);
                }, function (err) {
                    deferred.reject(err);
                })
            } else {
                deferred.reject('This platform does not support geolocation.');
            }

            return deferred.promise;
        };

        this.getCoordinatesFromAddress = function (address) {
            return $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: address
                }
            }).then(function (result) {
                return result.data && result.data.results ? result.data.results[0].geometry.location : null;
            }, function () {
                return null;
            });
        };

        // From: http://stackoverflow.com/a/11415329/959687
        this.calculateBearing = function (start, end) {
            var dLon = (end.lon - start.lon);
            var y = Math.sin(dLon) * Math.cos(end.lat);
            var x = Math.cos(start.lat) * Math.sin(end.lat) - Math.sin(start.lat) * Math.cos(end.lat) * Math.cos(dLon);
            var brng = toDegrees(Math.atan2(y, x));
            return toRadiants(360 - ((brng + 360) % 360));
        };
    }

    app.module.service('geolocation', Geolocation);
})();
