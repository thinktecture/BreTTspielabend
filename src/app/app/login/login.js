!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param $stae
     * @param {SecurityService} securityService
     */
    function LoginController($scope, $state, securityService) {
        $scope.model = {};

        $scope.login = function () {
            if (!$scope.model.username) {
                return;
            }

            securityService.login($scope.model.username, $scope.model.rememberMe)
                .then(function () {
                    if (securityService.isLoggedIn()) {
                        $state.go('main');
                    }
                });
        }
    }

    app.module.controller('loginController', LoginController);
}();
