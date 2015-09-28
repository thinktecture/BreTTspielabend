(function ($, jQuery) {
    "use strict";

    window.app = window.app || {resolver:{}};

    app.module = angular.module('brettspielabend', ['ui.router']);

    app.module.constant('webApiBaseUrl', 'http://localhost:8080/api');

})();
