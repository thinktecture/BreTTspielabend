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
            return $http.get(baseUrl + '/List')
                .then(function (result) {
                    return result.data;
                });
        };

        this.create = function (name) {
            return $http.post(baseUrl + '/create', {
                name: name
            })
                .then(function (result) {
                    return result.data;
                });
        };

        this.get = function (id) {
            return $http.get(baseUrl + '/get', {
                params: {
                    id: id
                }
            })
                .then(function (result) {
                    return result.data;
                });
        };

        this.getByName = function (name) {
            return $http.get(baseUrl + '/getByName', {
                params: {
                    name: name
                }
            })
                .then(function (result) {
                    return result.data;
                });
        }
    }

    app.module.service('userApi', UserApi);
})();
