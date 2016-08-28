/* jshint -W117, -W030 */
'use strict';

describe('Controller: MainCtrl', function () {

    beforeEach(module('boldApp'));

    var mainCtrl,
        scope,
        httpBackend,
        mockDataOk =  [
            {
                priority: 1,
                url: 'http://doesNotExist.boldtech.co'
            },
            {
                priority: 4,
                url: 'http://clarin.com'
            },
            {
                priority: 7,
                url: 'http://www.lanacion.com.ar'
            }
        ],
        mockDataFail =  [
            {
                priority: 1,
                url: 'http://doesNotExist.boldtech.co'
            },
            {
                priority: 2,
                url: 'http://doesNotExist.foo.com'
            }
        ];

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, FindServer) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;

        $httpBackend.when('GET', 'app/main/main.html').respond(200);

        mainCtrl = $controller('MainCtrl', {
            $scope: scope,
            FindServer: FindServer
        });
        var urlOk = '/app/mocks/server-response-ok.json';
        httpBackend.when('GET', urlOk).respond(200, mockDataOk);

        var urlFail = '/app/mocks/server-response-fail.json';
        httpBackend.when('GET', urlFail).respond(200, mockDataFail);
        httpBackend.flush();
    }));

    it('initial json mock server data', function() {
        expect(mainCtrl.listServerOnline).toEqual(mockDataOk);
        expect(mainCtrl.listServerOffline).toEqual(mockDataFail);
    });
});
