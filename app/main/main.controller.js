(function() {
    'use strict';
    angular
        .module('boldApp')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['FindServer'];

    /* @ngInject */
    function MainCtrl(FindServer) {
        var vm = this;

        activate();

        function activate() {
            FindServer.getServer()
                .then(function(data) {
                    console.log('succed:', data);
                })
                .catch(function(err) {
                    console.log('error: ', err);
                });
        }
    }
})();
