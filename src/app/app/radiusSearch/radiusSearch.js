(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param {Geolocation} geolocation
     * @param {ContestApi} contestApi
     */
    function RadiusSearchController($scope, geolocation, contestApi) {
        $scope.geolocationUnavailable = false;
        $scope.contests = undefined;
        $scope.coordinates = undefined;
        $scope.radiuses = [5, 10, 25, 50, 100, 250];
        $scope.model = {
            radius: 10
        };

        init();

        function init() {
            geolocation.getCoordinatesAsync()
                .then(function (coordinates) {
                    $scope.coordinates = {
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude
                    };
                }, function () {
                    $scope.geolocationUnavailable = true;
                });
        }

        $scope.search = function () {
            contestApi.findNearby($scope.model.radius, $scope.coordinates.latitude, $scope.coordinates.longitude)
                .then(function (contests) {
                    $scope.contests = contests;
                });
        };
    }

    app.module.controller('radiusSearchController', RadiusSearchController);
})();
