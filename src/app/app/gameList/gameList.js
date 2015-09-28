(function ($, jQuery, undefined) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param {GameApi} gameApi
     */
    function GameListController($scope, gameApi) {
        $scope.games = [];

        init();

        function init() {
            gameApi.list()
                .then(function (games) {
                    $scope.games = games;
                });
        }
    }

    app.module.controller('gameListController', GameListController);
})();
