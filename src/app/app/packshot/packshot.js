(function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param $stateParams
     * @param {GameApi} gameApi
     */
    function PackshotController($scope, $stateParams, gameApi) {
        init();

        function init() {
            var gameId = $stateParams.gameId;
            gameApi.get(gameId)
                .then(function (game) {
                    // TODO
                });
        }
    }

    app.module.controller('packshotController', PackshotController);
})();
