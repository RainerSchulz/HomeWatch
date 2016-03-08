/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function ImpressumController($scope, $location, $rootScope, $http, $log, Page) {
        $log.debug('ImpressumController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'Impressum';
        $scope.location = '/';

        $scope.ImpressumButton = [];

        // set Page Title
        Page.setTitle($scope.header);
    }

    ImpressumController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page'];


    angular.module('myApp')
        .controller('ImpressumController', ImpressumController);
}());