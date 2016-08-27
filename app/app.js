(function() {
    'use strict';
    angular
        .module('boldApp', [
            'ui.router',
            'boldApp.service.find-server',
            'ngPromiseExtras'
        ]);
})();
