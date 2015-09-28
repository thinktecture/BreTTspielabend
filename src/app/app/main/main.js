(function ($, jQuery, undefined) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param {ContestApi} contestApi
     */
    function MainController($scope, contestApi) {
        $scope.contests = undefined;

        init();

        function init() {
            contestApi.list()
                .then(function (contests) {
                    $scope.contests = contests;
                });
        }
    }

    app.module.controller('mainController', MainController);
})();
