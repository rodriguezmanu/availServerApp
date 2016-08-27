(function() {
    'use strict';

    angular
        .module('boldApp.service.find-server')
        .service('FindServer', FindServer);

    FindServer.$inject = ['$http', 'constantValues'];

    /* @ngInject */
    function FindServer($http, constantValues) {
        this.getServer = getServer;

        function getServer() {
            $http.get(constantValues().filesMock.ok)
                .then(function (response) {
                    angular.forEach(response.data, function (value) {
                        $http.get(value.url)
                            .then(function (response) {
                                console.log(response);
                            }, function (response) {
                                console.log('error:', response);
                            });
                    });
                }, function (response) {
                    console.log('error:', response);
                });
        }
    }
})();
