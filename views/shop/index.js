/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function ShopController($scope, $location, $rootScope, $http, $log, Page) {
        $log.debug('ShopController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'Shop';
        $scope.location = '/';

        // set Page Title
        Page.setTitle($scope.header);
    }

    ShopController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page'];


    angular.module('myApp')
        .controller('ShopController', ShopController);
}());