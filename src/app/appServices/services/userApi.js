(function ($, jQuery) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     *
     * @param {string} webApiBaseUrl
     * @param $http
     */
    function UserApi(webApiBaseUrl, $http) {
        var baseUrl = webApiBaseUrl + '/user';

        this.list = function () {
            return $http.get(baseUrl + '/list')
                .then(function (result) {
                    return result.data;
                });
        }
    }

    app.module.service('userApi', UserApi);
})();
