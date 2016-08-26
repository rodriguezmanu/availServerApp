(function() {
    'use strict';

    angular
        .module('boldApp')
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home',{
                    url:'/',
                    templateUrl: 'app/main/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'vm'
                });
        });
})();
