(function() {
    'use strict';
    angular
        .module('boldApp')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['FindServer'];

    /* @ngInject */
    function MainCtrl(FindServer) {
        var vm = this,
            okFile = 'ok',
            failFile = 'fail';

        vm.succed = succed;
        vm.failed = failed;

        activate();

        /**
         * Init method, get servers mock json to show in view as an example
         */
        function activate() {
            FindServer.getServers(okFile)
                .then((response) => {
                    vm.listServerOnline = response.data;
                });

            FindServer.getServers(failFile)
                .then((response) => {
                    vm.listServerOffline = response.data;
                });
        }

        /**
         * Get server online prioritized
         */
        function succed() {
            FindServer.getServerAvail(okFile)
                .then((data) => {
                    vm.serverOnline = data;
                })
                .catch((err) => {
                    vm.errorOnline = err;
                });
        }

        /**
         * Get server offline, an error will be shown.
         */
        function failed() {
            FindServer.getServerAvail(failFile)
                .then((data) => {
                    vm.serverOffline = data;
                })
                .catch((err) => {
                    vm.errorOffline = err;
                });
        }
    }
})();
