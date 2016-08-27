(function() {
    'use strict';

    angular
        .module('boldApp')
        .constant('constantValues', constantValues);

    function constantValues() {
        return {
            filesMock: {
                ok: '/app/mocks/server-response-ok.json',
                fail: '/app/mocks/server-response-fail.json'
            }
        };
    }
})();
