(function ($, jQuery, undefined) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param {Geolocation} geolocation
     * @param {ContestApi} contestApi
     * @param {GameApi} gameApi
     * @param {UserApi} userApi
     */
    function OrganizeContestController($scope, geolocation, contestApi, gameApi, userApi) {
        $scope.games = undefined;
        $scope.users = undefined;

        init();

        function init() {
            gameApi.list()
                .then(function (games) {
                    $scope.games = games;
                })
                .then(userApi.list)
                .then(function (users) {
                    $scope.users = users;
                });
        }
    }

    app.module.controller('organizeContestController', OrganizeContestController);
})();
