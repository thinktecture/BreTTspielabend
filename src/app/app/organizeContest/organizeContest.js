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
            location: {
                streetAddress: '',
                postCode: '',
                city: ''
            }
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
            var address = $scope.contest.location.streetAddress + ', ' + $scope.contest.location.postCode + ' ' + $scope.contest.location.city;
            geolocation.getCoordinatesFromAddress(address)
                .then(function (location) {
                    if (location) {
                        $scope.contest.location.coordinates = {
                            latitude: location.lat,
                            longitude: location.lng
                        };
                    }

                    return $scope.contest;
                })
                .then(contestApi.create)
                .then(function () {
                    $state.go('main');
                });
        };
    }

    app.module.controller('organizeContestController', OrganizeContestController);
})();
