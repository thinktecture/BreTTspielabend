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
    }

    app.module.service('geolocation', Geolocation);
})();
