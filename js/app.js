/**
 * Created by rsc on 18.01.2016.
 */
var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ngDialog', 'ngToast', 'ngTouch', 'ngAnimate', 'ui.router', 'ngSanitize', 'notification', 'tooltip', 'bootstrapLightbox'])
    .constant('globalSettings', {
        //url: http://login.th.homewatch-smarthome.de:8070/fhem?cmd=jsonlist2%20room=HomeWatch&XHR=1
        //url: http://login.th.homewatch-smarthome.de:8070/fhem?cmd=jsonlist2%genericDeviceType=switch&XHR=1
        url: 'http://login.homewatch-smarthome.de',
        localUrl: '',
        port: ":8130", //:8230
        cmd: "?cmd=jsonlist2%20",
        room: "room=", // Bungslow, Kamera, Alarm, Bad, Web, Rauchmelder usw.
        genericDeviceType: "genericDeviceType=", // switch_hm, light_hm, volume usw.
        param: "&XHR=1"
    })
    // configure our routes
    .config(['$routeProvider', 'ngDialogProvider', function ($routeProvider, ngDialogProvider) {
        $routeProvider

        // route for the home page
            .when('/', {
                templateUrl: 'views/logon/logon.html',
                controller: 'LogonController'
            })
            .when('/agb', {
                templateUrl: 'views/agb/index.html',
                controller: 'AgbController'
            })
            .when('/Impressum', {
                templateUrl: 'views/impressum/index.html',
                controller: 'ImpressumController'
            })

            .when('/Digitaler', {
                templateUrl: 'views/digitaler/index.html',
                controller: 'DigitalerController'
            })

            .when('/Demowand', {
                templateUrl: 'views/demowand/index.html',
                controller: 'DemowandController'
            })

            .when('/Verwaltung', {
                templateUrl: 'views/verwaltung/index.html',
                controller: 'VerwaltungController'
            })
            .when('/assessing', {
                templateUrl: 'views/assessing/index.html',
                controller: 'AssessingController'
            })
            .when('/secure', {
                templateUrl: 'views/secure/index.html',
                controller: 'SecureController'
            })

            .when('/shop', {
                templateUrl: 'views/shop/index.html',
                controller: 'ShopController'
            })
            .when('/Liegenschaften', {
                templateUrl: 'views/liegenschaften/index.html',
                controller: 'LiegenschaftenController'
            })

            .when('/Liegenschaften/:id/home', {
                templateUrl: 'views/home/home.html',
                controller: 'HomeController'
            })

            .when('/Liegenschaften/:id/home/:name', {
                templateUrl: 'views/home/all/index.html',
                controller: 'HomeAllController'
            })
            .when('/Clubmitgliedschaft', {
                templateUrl: 'views/clubmitgliedschaft/index.html',
                controller: 'ClubmitgliedschaftController'
            })

            .when('/MeineDaten', {
                templateUrl: 'views/meinedaten/index.html',
                controller: 'MeineDatenController'
            })

            // route for the home page
            .otherwise({
                redirectTo: '/'
            });

        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-default',
            plain: false,
            showClose: true,
            closeByDocument: true,
            closeByEscape: true,
            appendTo: false,
            preCloseCallback: function () {
                console.log('default pre-close callback');
            }
        });

        angular.module('myApp').factory("page", function ($rootScope) {
            var page = {};
            var user = {};
            page.setPage = function (title, bodyClass) {
                $rootScope.pageTitle = title;
                $rootScope.bodylayout = bodyClass;
            };
            page.setUser = function (user) {
                $rootScope.user = user;
            };
            return page;
        });
    }])
    .config(function (LightboxProvider) {
        // set a custom template
        LightboxProvider.templateUrl = "templates/widgets/modalImage/index.html";
        LightboxProvider.fullScreenMode = true;
    })
    .config(['ngToastProvider', function (ngToastProvider) {
        ngToastProvider.configure({
            animation: 'slide' // or 'fade'
        });
    }])
    .run(function ($window, $rootScope) {
        $rootScope.onLine = navigator.onLine;
        $window.addEventListener("offLine", function () {
            $rootScope.$apply(function () {
                $rootScope.onLine = false;
            });
        }, false);
        $window.addEventListener("onLine", function () {
            $rootScope.$apply(function () {
                $rootScope.onLine = true;
            });
        }, false);

        $rootScope.connection = 'Internet';
        $rootScope.company = 'CAMDATA';
    });
myApp.value('user', {
    staffId: 1,
    fullName: "Rainer Schulz",
});
myApp.value('connection', {
    internet: true,
    url: "http://192.168.2.33:5000/webman/index.cgi",
    local: "",
    router: "",
    onlineStatus: "",
    originUrl: "http://localhost:63342/",
    application: "/HomeWatch 2.0/",
    applicationUrl: "",
    fhemweb_url: "http://login.homewatch-smarthome.de:8130/fhem"
});


(function () {
    'use strict';

    function MainController($scope, $window, $log, $http, $state, $rootScope, HomeService, ngDialog, onlineStatus, connection, Page) {
        var self = this;

        connection.originUrl = $window.location.origin;
        connection.applicationUrl = connection.originUrl + connection.application;

        connection.online = onlineStatus;

        $scope.onlineStatus = onlineStatus;

        $scope.$watch('onlineStatus.isOnline()', function (online) {
            $scope.online_status_string = online ? 'online' : 'offline';
            $log.debug($scope.online_status_string);
        });

        $scope.title = 'CAMDATA - HomeWatch 2.0';
        $scope.message = 'MainController startet';
        $log.debug($scope.message);
        $scope.user = {};

        // set Page MetaData
        Page.setMetaData("fhemweb_url", connection.fhemweb_url);

        $scope.openTemplate = function () {
            $scope.value = true;

            ngDialog.open({
                template: 'views/user/index.html',
                controller: 'UserController',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        };


        $scope.startVolume = function () {
            $scope.result = [];

            GetFhemJsonFile($scope, $http);
        };
        // Widget Content
        function GetFhemJsonFile($scope, $http) {
            var name = "light_hm,dimmer_hm";

            var values = name.split(',');
            angular.forEach(values, function (value) {

                HomeService.getHomeByIdJson(value).then(function () {
                        $log.debug('getHomeByIdJson: ' + value);
                        var data = HomeService.data();
                        $scope.result.push(data.Results);
                        $log.debug('$scope.result.length 2:' + $scope.result.length);

                    })
                    .catch(function (callback) {
                        $log.debug(callback);
                    });

            });
        }
    }

    MainController.$inject = ['$scope', '$window', '$log', '$http', '$state', '$rootScope', 'HomeService', 'ngDialog', 'onlineStatus', 'connection', 'Page'];

    angular.module('myApp')
        .controller('MainController', MainController);

}());
