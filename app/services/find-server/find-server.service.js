(function() {
    'use strict';

    angular
        .module('boldApp.service.find-server')
        .service('FindServer', FindServer);

    FindServer.$inject = ['$http', 'constantValues', '$q'];

    /* @ngInject */
    function FindServer($http, constantValues, $q) {
        this.getServers = getServers;
        this.getServerAvail = getServerAvail;

        function getServers(status) {
            return $http.get(constantValues().filesMock[status]);
        }

        function getServerAvail(status) {
            var servers = [],
                deferred = $q.defer(),
                priority = 0,
                server;

            $http.get(constantValues().filesMock[status])
                .then((response) => {
                    angular.forEach(response.data, (value) => {
                        servers.push(
                            $http.get(`/api/checkAvailabilityService?url=${value.url}&priority=${value.priority}`,
                                {timeout: 5000})
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
                            if (angular.isUndefined(server)) {
                                deferred.reject('All servers are Off-line');
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
