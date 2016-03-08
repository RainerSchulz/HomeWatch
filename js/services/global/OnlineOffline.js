/**
 * Created by Fabrice on 26.01.2016.
 */
myApp.factory('onlineStatus', ["$window", "$rootScope", function ($window, $rootScope) {
    var onlineStatus = {};

    onlineStatus.onLine = $window.navigator.onLine;

    onlineStatus.isOnline = function () {
        return onlineStatus.onLine;
    }

    $window.addEventListener("online", function () {
        onlineStatus.onLine = true;
        $rootScope.$digest();
    }, true);

    $window.addEventListener("offline", function () {
        onlineStatus.onLine = false;
        $rootScope.$digest();
    }, true);

    return onlineStatus;
}]);

myApp.service('Internet', function ($http, connection) {
    this.IsOk = function () {
        return $http({
            method: 'HEAD',
            url: connection.url
        })
            .then(function (response) {
                var status = response.status;
                return status >= 200 && status < 300 || status === 304;
            });
    };

});

/*
 var OnOffService = angular.module('myApp', [],
 function ($httpProvider) {

 var interceptor = ['$rootScope', '$q', function ($rootScope, $q) {

 function success(response) {
 return response;
 }

 function error(response) {
 var status = response.status;

 if ((status >= 400) && (status < 500)) {
 $rootScope.broadcast("AuthError", status);
 return;
 }

 if ((status >= 500) && (status < 600)) {
 $rootScope.broadcast("ServerError", status);
 return;
 }


 return $q.reject(response);

 }

 return function (promise) {
 return promise.then(success, error);
 }

 }];
 $httpProvider.responseInterceptors.push(interceptor);
 })
 */
