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

        /**
         * Get Servers from json mock
         * @param  {String} status [json file ending | ok or fail]
         * @return {Promise}       [mock data servers]
         */
        function getServers(status) {
            return $http.get(constantValues().filesMock[status]);
        }

        /**
         * Get Service availability, could be online with lowest priority or in case all are off line return an error
         * @param  {String} status [json file ending | ok or fail]
         * @return {Promise}       [Server online with lowest priority or error when are all offline]
         */
        function getServerAvail(status) {
            var servers = [],
                deferred = $q.defer(),
                priority = 0,
                server;

            //get servers from mock json depending status
            $http.get(constantValues().filesMock[status])
                .then((response) => {
                    angular.forEach(response.data, (value) => {
                        servers.push(
                            $http.get(`/api/checkAvailabilityService?url=${value.url}&priority=${value.priority}`,
                                {timeout: 5000})
                        );
                    });

                    //make all get calls simultaneously in order to see is online or not and then return this
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

                            // undefined means are all offline
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
