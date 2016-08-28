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
                .then(function (response) {
                    vm.listServerOnline = response.data;
                });

            FindServer.getServers(failFile)
                .then(function (response) {
                    vm.listServerOffline = response.data;
                });
        }

        function succed() {
            FindServer.getServerAvail(okFile)
                .then(function(data) {
                    vm.serverOnline = data;
                })
                .catch(function(err) {
                    vm.errorOnline = err;
                });
        }

        function failed() {
            FindServer.getServerAvail(failFile)
                .then(function(data) {
                    vm.serverOffline = data;
                })
                .catch(function(err) {
                    vm.errorOffline = err;
                });
        }
    }
})();
