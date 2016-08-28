(function() {
    'use strict';
    angular
        .module('boldApp')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['FindServer'];

    /* @ngInject */
    function MainCtrl(FindServer) {
        var vm = this;

        vm.succed = succed;
        vm.failed = failed;

        activate();

        function activate() {
            FindServer.getServers('ok')
                .then(function (response) {
                    vm.listServerOnline = response.ata;
                });

            FindServer.getServers('fail')
                .then(function (response) {
                    vm.listServerOffline = response.data;
                });
        }

        function succed() {
            FindServer.getServerAvail('ok')
                .then(function(data) {
                    vm.serverOnline = data;
                })
                .catch(function(err) {
                    vm.errorOnline = err;
                });
        }

        function failed() {
            FindServer.getServerAvail('fail')
                .then(function(data) {
                    vm.serverOffline = data;
                })
                .catch(function(err) {
                    vm.errorOffline = err;
                });
        }
    }
})();
