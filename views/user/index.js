/**
 * Created by B026789 on 03.12.2015.
 */
(function () {
    'use strict';
    function UserController($scope, $location, $rootScope, $http) {

        $scope.message = 'Vermittler! alles zur Agentur.';
        $rootScope.theme = 'ngdialog-theme-default';
        $scope.showModal = false;

        $scope.tabs = [{
            title: 'Adresse',
            url: 'one.tpl.html'
        }, {
            title: 'Agentur',
            url: 'two.tpl.html'
        }, {
            title: 'In Kooperation mit:',
            url: 'three.tpl.html'
        }];

        $scope.currentTab = 'one.tpl.html';

        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.url;
        };

        $scope.isActiveTab = function (tabUrl) {
            return tabUrl == $scope.currentTab;
        };

        $scope.data = [];
        $scope.init = function () {

            $http.get('json/userProfile.json').then(
                function (response) {
                    console.log(response);
                    $scope.userAddress = response.data.result;
                },
                function (error) {
                }
            );

            $http.get('json/agentur.json').then(
                function (response) {
                    console.log(response);
                    $scope.userAgentur = response.data.result;
                },
                function (error) {
                }
            );

            $http.get('json/anotherAgency.json').then(
                function (response) {
                    console.log(response);
                    $scope.anotherAgency = response.data.result;
                },
                function (error) {
                }
            );

        };


        $scope.click = function (name) {
            $location.path(name);
        };

    }

    UserController.$inject = ['$scope', '$location', '$rootScope', '$http'];

    UserController.resolve = {};

    angular.module('myApp')
        .controller('UserController', UserController);

}());