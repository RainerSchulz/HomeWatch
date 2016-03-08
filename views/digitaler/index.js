/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function DigitalerController($scope, $location, $rootScope, $http, $log, Page) {
        $log.debug('DigitalerController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'Digitaler Hausmeister';
        $scope.location = '/';

        // set Page Title
        Page.setTitle($scope.header);
    }

    DigitalerController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page'];


    angular.module('myApp')
        .controller('DigitalerController', DigitalerController);
}());