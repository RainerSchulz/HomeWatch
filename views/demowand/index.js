/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function DemowandController($scope, $location, $rootScope, $http, $log, Page) {
        $log.debug('DemowandController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'Demowand';
        $scope.location = '/';

        // set Page Title
        Page.setTitle($scope.header);
    }

    DemowandController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page'];


    angular.module('myApp')
        .controller('DemowandController', DemowandController);
}());