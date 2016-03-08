/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function ClubmitgliedschaftController($scope, $location, $rootScope, $http, $log, Page, Jsonervice) {
        $log.debug('ClubmitgliedschaftController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'Clubmitgliedschaft';
        $scope.location = '/';

        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            GetNav($scope, $http);
        };

        function GetNav($scope, $http) {
            Jsonervice.getJson('clubmitgliedschaftNav').then(function () {

                    var data = Jsonervice.data();

                    $scope.navButton = data.resultNav; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        };
    }

    ClubmitgliedschaftController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page', 'Jsonervice'];


    angular.module('myApp')
        .controller('ClubmitgliedschaftController', ClubmitgliedschaftController);
}());