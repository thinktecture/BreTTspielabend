(function ($, jQuery) {
    "use strict";

    window.app = window.app || { resolver: {} };

    app.module = angular.module('brettspielabend', ['ui.router']);

    app.module.constant('webApiBaseUrl', 'http://windows8vm.local:8080/api');

    app.module.run(
        /**
         *
         * @param $rootScope
         * @param $state
         * @param {SecurityService} securityService
         */
        function ($rootScope, $state, securityService) {
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                if (securityService.isLoggedIn()) {
                    return;
                }

                if (toState.data && toState.data.needsAuthentication) {
                    event.preventDefault();
                    $state.go('login');
                }
            });
        });
})();
