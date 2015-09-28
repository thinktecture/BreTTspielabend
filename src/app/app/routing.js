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
            .state('radiusSearch', getState('radiusSearch'));

        $urlRouterProvider.otherwise('/');

        function getState(key, urlOverride) {
            var url = urlOverride ? urlOverride : '/' + key;

            return {
                url: url,
                templateUrl: 'app/' + key + '/' + key + '.html',
                controller: key + 'Controller'
            };
        }
    }

    app.module.config(RoutingConfig);

})();
