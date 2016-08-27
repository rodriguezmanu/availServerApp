(function() {
    'use strict';

    angular
        .module('boldApp.service.find-server')
        .service('FindServer', FindServer);

    FindServer.$inject = ['$http', 'constantValues', '$q'];

    /* @ngInject */
    function FindServer($http, constantValues, $q) {
        this.getServer = getServer;

        function getServer() {
            var servers = [],
                deferred = $q.defer(),
                priority = 0,
                server;

            $http.get(constantValues().filesMock.ok)
                .then((response) => {
                    angular.forEach(response.data, (value) => {
                        servers.push(
                            $http.get(`/api/checkAvailabilityService?url=${value.url}&priority=${value.priority}`, {timeout: 5000})
                        );
                    });
                    $q.allSettled(servers)
                    .then((entries) => {
                        angular.forEach(entries,(entry) => {
                            if (entry.state === 'fulfilled') {
                                if (entry.value.data.priority > priority) {
                                    priority = entry.value.data.priority;
                                    server = entry.value.data.url;
                                }
                            }
                        });
                        if (server === undefined) {
                            deferred.reject('error');
                        } else {
                            deferred.resolve(server);
                        }
                    });

                }, (response) => {
                    console.log('error get:', response);
                });

            return deferred.promise;
        }
    }
})();
