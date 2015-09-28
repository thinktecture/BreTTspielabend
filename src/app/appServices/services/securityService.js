!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @ngdoc service
     * @public
     *
     * @param {UserApi} userApi
     */
    function SecurityService(userApi) {
        var localStorageKey = 'brettspielabend.userId';

        var userId;
        var loginPromise;

        this.getUserId = function () {
            return userId;
        };

        this.isLoggedIn = function () {
            return !!userId;
        };

        this.login = function (username, rememberMe) {
            if (loginPromise) {
                return loginPromise;
            }

            loginPromise = userApi.getByName(username)
                .then(function (result) {
                    return result;
                }, function () {
                    return userApi.create(username)
                })
                .then(function (result) {
                    userId = result.id;

                    if (rememberMe) {
                        localStorage.setItem(localStorageKey, userId);
                    }
                })
                .finally(function () {
                    loginPromise = undefined;
                });

            return loginPromise;
        };

        function initialize() {
            var id = localStorage.getItem(localStorageKey);

            if (id && id !== null && id.trim()) {
                userId = id;
            }
        }

        initialize();
    }

    app.module.service('securityService', SecurityService);
}();
