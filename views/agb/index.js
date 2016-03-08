/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function AgbController($scope, $location, $rootScope, $http, $log, Page) {
        $log.debug('AgbController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'AGB';
        $scope.location = '/';

        $scope.AgbButton = [];

        // set Page Title
        Page.setTitle($scope.header);
    }

    AgbController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page'];


    angular.module('myApp')
        .controller('AgbController', AgbController);
}());