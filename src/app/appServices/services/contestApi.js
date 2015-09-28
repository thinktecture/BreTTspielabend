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
        }
    }

    app.module.service('contestApi', ContestApi);
})();
