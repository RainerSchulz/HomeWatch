/**
 * Created by B026789 on 03.12.2015.
 */
(function () {
    'use strict';
    function LogonController($scope, $location, $rootScope, $http, $log, Page, ModalService, CookiesService) {
        $log.debug('LogonController gestartet!');

        var self = this;

// create a message to display in our view
        $scope.company = "CAMDATA";
        $scope.showModal = false;

        $scope.location = "/Liegenschaften";
        $scope.LogonButton = [];

        // set Page Title
        Page.setTitle("Login");

        $scope.init = function () {
            // load config.json to cookies
            $rootScope.config = CookiesService.getCookie('config') || {};
            if (!$rootScope.config.globals) {
                CookiesService.setCookieJson('config');
            }
            Page.setMetaData("fhemweb_url", $rootScope.config.connection.fhemweb_url);
            $log.debug('fhemweb_url' +  $rootScope.config.connection.fhemweb_url)
        };

        $scope.startLiegenschaften = function () {
            $log.debug($rootScope.config);
            $location.path($scope.location);
        };

        $scope.login = function () {

            ModalService.showModal({
                templateUrl: "views/login/index_modal.html",
                controller: "LoginController"
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    $location.path("logon");
                });
            });

        };

    }

    LogonController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page', 'ModalService', 'CookiesService'];


    angular.module('myApp')
        .controller('LogonController', LogonController);
}());