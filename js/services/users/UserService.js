/**
 * Created by B026789 on 13.01.2016.
 */
myApp.factory('UserService', function ($http, $q) {
    var url = 'http://localhost:3839/api/lebenprivat/getlebenprivat/';
    var deffered = $q.defer();
    var data = [];
    var UserService = {};

    UserService.async = function (id, index) {
        $http.get(url + id + '/' + index)
            .success(function (d) {
                data = d;
                console.log(d);
                deffered.resolve();
            });
        return deffered.promise;
    };
    UserService.data = function () {
        return data;
    };

    return UserService;
});