/* jshint -W117, -W030 */
'use strict';

describe('Controller: MainCtrl', function () {

    beforeEach(module('boldApp'));

    var mainCtrl,
        scope,
        httpBackend,
        q,
        deferred,
        urlServer,
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

        mainCtrl = $controller('MainCtrl', {
            $scope: scope,
            FindServer: FindServer
        });

        httpBackend.when('GET', 'app/main/main.html').respond(200);
        httpBackend.when('GET', '/app/mocks/server-response-ok.json').respond(200, mockDataOk);
        httpBackend.when('GET', '/app/mocks/server-response-fail.json').respond(200, mockDataFail);

        httpBackend.flush();
    }));

    it('initial json mock server data', function() {
        expect(mainCtrl.listServerOnline).toEqual(mockDataOk);
        expect(mainCtrl.listServerOffline).toEqual(mockDataFail);
    });

    it('online servers', inject(function(_$q_, FindServer) {
        q = _$q_;
        deferred = _$q_.defer();

        spyOn(FindServer, 'getServerAvail').and.callFake(function () {
            var d = q.defer();
            d.resolve('www.foo.com');
            return d.promise;
        });

        mainCtrl.succed();
        deferred.resolve();

        scope.$apply();

        expect(mainCtrl.serverOnline).toBe('www.foo.com');
        expect(mainCtrl.errorOnline).toBe(undefined);
    }));

    it('offline servers', inject(function(_$q_, FindServer) {
        q = _$q_;
        deferred = _$q_.defer();

        spyOn(FindServer, 'getServerAvail').and.callFake(function () {
            var d = q.defer();
            d.reject('fail');
            return d.promise;
        });

        mainCtrl.failed();
        deferred.reject();

        scope.$apply();

        expect(mainCtrl.serverOffline).toBe(undefined);
        expect(mainCtrl.errorOffline).toBe('fail');
    }));

    it('should return server online priorizated', function() {
        mainCtrl.succed();

        for (var i = 0; i < mockDataOk.length; i++) {
            urlServer = `/api/checkAvailabilityService?url=${mockDataOk[i].url}&priority=${mockDataOk[i].priority}`;
            httpBackend.when('GET', urlServer).respond(200, {
                url: mockDataOk[i].url,
                priority:mockDataOk[i].priority
            });
        }

        httpBackend.flush();

        expect(mainCtrl.serverOnline).toBe('http://www.lanacion.com.ar');
        expect(mainCtrl.errorOnline).toBe(undefined);
    });

    it('should return server offline', function() {
        mainCtrl.failed();

        for (var i = 0; i < mockDataFail.length; i++) {
            urlServer = `/api/checkAvailabilityService?url=${mockDataFail[i].url}&priority=${mockDataFail[i].priority}`;
            httpBackend.when('GET', urlServer).respond(300);
        }

        httpBackend.flush();

        expect(mainCtrl.errorOffline).toBe('All servers are Off-line');
        expect(mainCtrl.serverOffline).toBe(undefined);
    });
});
