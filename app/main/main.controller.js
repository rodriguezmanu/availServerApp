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

        function succed() {
            FindServer.getServerAvail(okFile)
                .then((data) => {
                    vm.serverOnline = data;
                })
                .catch((err) => {
                    vm.errorOnline = err;
                });
        }

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
