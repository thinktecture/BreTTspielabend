(function ($, jQuery) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     *
     * @param {string} webApiBaseUrl
     * @param $http
     */
    function GameApi(webApiBaseUrl, $http) {
        var baseUrl = webApiBaseUrl + '/game';

        this.list = function () {
            return $http.get(baseUrl + '/List')
                .then(function (result) {
                    return result.data;
                });
        };

        this.get = function (id) {
            return $http.get(baseUrl + '/Get', {
                params: {
                    id: id
                }
            }).then(function (result) {
                return result.data;
            });
        };
    }

    app.module.service('gameApi', GameApi);
})();
