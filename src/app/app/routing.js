(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     *
     * @param $stateProvider
     * @param $urlRouterProvider
     */
    function RoutingConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', getState('main', '/'))
            .state('radiusSearch', getState('radiusSearch'))
            .state('organizeContest', getState('organizeContest'))
            .state('login', getState('login', '/login', true))
            .state('gameList', getState('gameList'));

        $urlRouterProvider.otherwise('/');

        function getState(key, urlOverride, anonym) {
            var url = urlOverride ? urlOverride : '/' + key;

            return {
                url: url,
                templateUrl: 'app/' + key + '/' + key + '.html',
                controller: key + 'Controller',
                data: {
                    needsAuthentication: !anonym
                }
            };
        }
    }

    app.module.config(RoutingConfig);

})();
