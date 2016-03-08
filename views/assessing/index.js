/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function AssessingController($scope, $location, $rootScope, $http, $log, Page) {
        $log.debug('AssessingController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'Assessing';
        $scope.location = '/';

        // set Page Title
        Page.setTitle($scope.header);
    }

    AssessingController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page'];


    angular.module('myApp')
        .controller('AssessingController', AssessingController);
}());