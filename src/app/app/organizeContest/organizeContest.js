(function ($, jQuery, undefined) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param $state
     * @param {Geolocation} geolocation
     * @param {ContestApi} contestApi
     * @param {GameApi} gameApi
     * @param {UserApi} userApi
     */
    function OrganizeContestController($scope, $state, geolocation, contestApi, gameApi, userApi) {
        $scope.games = undefined;
        $scope.users = undefined;
        $scope.contest = {
            hostId: undefined,
            gameId: undefined,
            location: {}
        };

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

        $scope.submit = function () {
            contestApi.create($scope.contest)
                .then(function () {
                    $state.go('main');
                });
        };
    }

    app.module.controller('organizeContestController', OrganizeContestController);
})();
