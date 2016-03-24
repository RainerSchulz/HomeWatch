/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function RoomController($scope, $location, $rootScope, $routeParams, $log, Page) {
        $log.debug('RoomController startet');
        var self = this;

// create a message to display in our view
        $scope.header = $routeParams.room;
        $scope.location = '/';

        // set Page Title
        Page.setTitle($scope.header);
    }

    RoomController.$inject = ['$scope', '$location', '$rootScope', '$routeParams', '$log', 'Page'];


    angular.module('myApp')
        .controller('RoomController', RoomController);
}());