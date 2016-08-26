(function() {
    'use strict';

    angular
        .module('boldApp.service.find-server')
        .service('FindServer', FindServer);

    /* @ngInject */
    function FindServer() {
        this.getServer = getServer;

        function getServer() {
        }
    }
})();
