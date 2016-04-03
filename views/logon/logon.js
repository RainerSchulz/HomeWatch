/**
 * Created by B026789 on 03.12.2015.
 */
(function () {
    'use strict';
    function LogonController($scope, $location, $rootScope, $http, $log, Page, ModalService, $cookieStore, CookiesService, FillAllDataService) {
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

        };

        $scope.startLiegenschaften = function () {

            // keep homewatch in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if (!$rootScope.globals.homewatch) {
                CookiesService.setCookieJson('globals');
            }

            var widget = FillAllDataService.loadWidgets('Beleuchtung');
            if (widget) {
                alert('passt');
            }
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

    LogonController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page', 'ModalService', '$cookieStore', 'CookiesService', 'FillAllDataService'];


    angular.module('myApp')
        .controller('LogonController', LogonController);
}());