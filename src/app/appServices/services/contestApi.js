(function ($, jQuery) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     *
     * @param {string} webApiBaseUrl
     * @param $http
     */
    function ContestApi(webApiBaseUrl, $http) {
        var baseUrl = webApiBaseUrl + '/contest';

        this.create = function (contest) {
            return $http.post(baseUrl + '/Create', contest);
        };

        this.list = function () {
            return $http.get(baseUrl + '/List')
                .then(function (result) {
                    return result.data;
                });
        };

        this.findNearby = function (radius, latitude, longitude) {
            return $http.get(baseUrl + '/FindNearby', {
                params: {
                    radius: radius,
                    latitude: latitude,
                    longitude: longitude
                }
            }).then(function (result) {
                return result.data;
            })
        };
    }

    app.module.service('contestApi', ContestApi);
})();
