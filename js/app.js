/**
 * Created by rsc on 18.01.2016.
 */
var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ngDialog', 'ngToast', 'ngTouch', 'ngAnimate', 'ngCookies', 'ui.router', 'ngSanitize', 'notification', 'tooltip', 'bootstrapLightbox', 'angularModalService'])
    .constant('globalSettings', {
        url: 'http://login.homewatch-smarthome.de',
        port: ":8130", //:8139
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
            .when('/login', {
                templateUrl: 'views/login/index.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })

            .when('/register', {
                templateUrl: 'views/register/index.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
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
                templateUrl: 'views/home/widgets/index.html',
                controller: 'WidgetsController'
            })

            .when('/Liegenschaften/:id/home/:name/:room', {
                templateUrl: 'views/home/widgets/room/index.html',
                controller: 'RoomController'
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
    onlineStatus: "URL_local",
    originUrl: "http://localhost:63342/",
    application: "/HomeWatch 2.0/",
    fhemweb_url: "http://login.homewatch-smarthome.de:8130/fhem",
    URL_DC: "http://login.homewatch-smarthome.de:8139",
    URL_dyndns: "http://rou-wan-002.camdata.de:8083",
    URL_local: "http://10.221.251.126:8083",
    isDebug: true
});


(function () {
    'use strict';

    function MainController($scope, $window, $log, $http, $rootScope, $cookieStore, $location, onlineStatus, connection, Page) {
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


        /*
         // keep user logged in after page refresh
         $rootScope.globals = $cookieStore.get('globals') || {};
         if ($rootScope.globals.currentUser) {
         $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
         }

         $rootScope.$on('$locationChangeStart', function (event, next, current) {
         // redirect to login page if not logged in and trying to access a restricted page
         var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
         var loggedIn = $rootScope.globals.currentUser;
         if (restrictedPage && !loggedIn) {
         $location.path('/login');
         }
         });
         */
        // set Page MetaData
        Page.setMetaData("fhemweb_url", connection.fhemweb_url);
    }

    MainController.$inject = ['$scope', '$window', '$log', '$http', '$rootScope', '$cookieStore', '$location', 'onlineStatus', 'connection', 'Page'];

    angular.module('myApp')
        .controller('MainController', MainController);

}());
