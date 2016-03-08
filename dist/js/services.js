/**
 * Created by B026789 on 14.12.2015.
 */
(function(){
    'use strict';
    angular.module('myApp.ng.services', ['ngProgressLite']);
}());
/**
 * Created by B026789 on 12.01.2016.
 */
myApp.service('Page', function ($rootScope) {
    return {
        setTitle: function (title) {
            $rootScope.title = title +  " - CAMDATA - HomeWatch 2.0";
        },
        setHeader: function (header) {
            $rootScope.header = header;
        },
      	setMetaData: function (name, content) {
            $rootScope.MetaDatafhemweb_url = content;

        },
        getMetaData: function (name, content) {
            $rootScope.MetaDataContent = content;

            $scope.metadata = {
		        'title': name,
		        'description': content
		    };
        }


    }
});
/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('Jsonervice', function ($http, notification, $log, $q, globalSettings, CacheService, connection) {
    var data = [];
    var deffered = $q.defer();
    var Jsonervice = {};
    var urlcmd = globalSettings.url + globalSettings.port + globalSettings.cmd;
    var originUrl = connection.originUrl;

    Jsonervice.getJson = function (name) {

        var url = 'json/homewatch/' + name + '.json';

        return $http({
            method: 'GET',
            cache: true,
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();

                $log.debug("Jsonervice by Json " + name);
                $log.debug(data);
            })
            .error(function (err, status, headers, config) {

                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == 404) {
                    url = originUrl + url;
                    $log.debug(url);
                } else if (status == -1) {
                    $log.debug('error: connection refused ' + status);
                } else {
                    $log.debug('error: ' + status);
                }


            });


    };

    Jsonervice.data = function () {
        return data;
    };
    return Jsonervice;
});

/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('FavoritenService', function ($http, notification, $log, $q, HomeService) {
    {
        var selected_index = -1;
        var tbFavoriten = localStorage.getItem("tbFavoriten");
        tbFavoriten = JSON.parse(tbFavoriten);
        if (tbFavoriten == null)
            tbFavoriten = [];
        return {

            addFavorite: function (favorit) {
                if (favorit.Attributes.like == 'yes') {
                    HomeService.setFavorit(favorit.Name, 'no');
                    $log.debug("Favorit gelöscht");
                    tbFavoriten.splice(selected_index, 1);
                    localStorage.setItem("tbFavoriten", JSON.stringify(tbFavoriten));
                    favorit.Attributes.like = 'yes';
                }
                else {
                    HomeService.setFavorit(favorit.Name, 'yes');
                    tbFavoriten.push(favorit);
                    localStorage.setItem("tbFavoriten", JSON.stringify(tbFavoriten));
                    $log.debug("Favorit gespeichert");
                    favorit.Attributes.like = 'no';
                }

                $log.debug(favorit);
            }

        }
    }
});

/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('HomeService', function ($http, notification, $log, $q, globalSettings, CacheService, connection, $rootScope) {
    var data = [];
    var deffered = $q.defer();
    var HomeService = {};
    var urlcmd = $rootScope.MetaDatafhemweb_url + globalSettings.cmd;

    HomeService.getHomeByRoom = function (room) {
        var url = urlcmd + globalSettings.room + room + globalSettings.param;
        $log.debug(url);
        $log.debug('connection.internet: ' + connection.internet);
        return $http({
            method: 'GET',
            cache: true,
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();

                $log.debug("HomeService by room");
                $log.debug(data);
            })
            .error(function (err, status, headers, config) {
                connection.internet = "false";
                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == -1) {
                    $log.debug('error: connection refused ' + status);
                } else {
                    $log.debug('error: ' + status);
                }
            });


        /*
         return CacheService.jsonCache(room, data, url);

         */
    };

    HomeService.getHomeByAdvice = function (device) {
        var url = urlcmd + globalSettings.genericDeviceType + device + globalSettings.param;
        $log.debug(url);
        $log.debug('connection.internet: ' + connection.internet);
        return $http({
            method: 'GET',
            cache: true,
            url: url
        }).success(function (d) {
                data = d;


                $log.debug("HomeService by advice");
            })
            .error(function (err, status, headers, config) {
                connection.internet = "false";
                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == -1) {
                    $log.debug('error: connection refused ' + status);
                } else {
                    $log.debug('error: ' + status);
                }
            });

    };

    HomeService.getHome = function (name, type) {

        var url = $rootScope.MetaDatafhemweb_url + globalSettings.cmd +  type + '=' + name + globalSettings.param;
        $log.debug('getHome url: ' + url);
        return $http({
            method: 'GET',

            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();

                $log.debug("HomeService by Home");
            })
            .error(function (err, status, headers, config) {
                connection.internet = "false";
                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == -1) {
                    $log.debug('error: connection refused ' + status);
                } else {
                    $log.debug('error: ' + status);
                }
            });

    };

    HomeService.setFavorit = function (name, type) {

        var url = $rootScope.MetaDatafhemweb_url  + '?cmd=attr%20' +  name + '%20like%20' + type + globalSettings.param;
        $log.debug(url);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();

                $log.debug("HomeService by Home");
            })
            .error(function (err, status, headers, config) {
                connection.internet = "false";
                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == -1) {
                    $log.debug('error: connection refused ' + status);
                } else {
                    $log.debug('error: ' + status);
                }
            });

    };

    HomeService.setPreset = function (name, type) {
        //set Cam_Demowand preset alarm
        var url = $rootScope.MetaDatafhemweb_url  + '?cmd=attr%20set%20' +  name + '%20preset%20' + type + globalSettings.param;
        $log.debug(url);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();

                $log.debug("HomeService by Home");
            })
            .error(function (err, status, headers, config) {
                connection.internet = "false";
                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == -1) {
                    $log.debug('error: connection refused ' + status);
                } else {
                    $log.debug('error: ' + status);
                }
            });

    };

    HomeService.getHomeByIdJson = function (name) {
        $log.debug('connection.internet: ' + connection.internet);
        return $http({
            method: 'GET',
            cache: true,
            url: 'json/homewatch/data/' + name + '.json'
        }).success(function (d) {
                data = d;
                deffered.resolve();

                $log.debug("HomeService by Json");
                $log.debug(data);
            })
            .error(function (err, status, headers, config) {

                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == -1) {
                    $log.debug('error: connection refused ' + status);
                } else {
                    $log.debug('error: ' + status);
                }


            });


    };

    HomeService.data = function () {
        return data;
    };
    return HomeService;
});

/**
 * Created by Fabrice on 25.01.2016.
 */
myApp.service('CacheService', function ($log, $http, $cacheFactory) {

    var myCache = $cacheFactory("myServiceCache");
    $log.log(myCache.info());

    return {

        jsonCache: function (id, responder, name) {

            var params = {id: id};

            var config = {
                path: '/' + name,
                cache: myCache,
                method: 'GET',
                params: params
            };

            $http(config)
                .success(function (data, status, headers, config) {
                    $log.log(myCache.info());

                    if (responder && responder.result && typeof responder.result == "function")
                        responder.result(data);
                })
                .error(function (data, status, headers, config) {
                    if (responder && responder.fault && typeof responder.fault == "function")
                        responder.fault(data, status, headers, config);


                });
        }
    }
});
/**
 * Created by Rainer on 01.03.2016.
 */
myApp.service('MetaService', function() {
    var title = 'fhemweb_url';
    var metaDescription = 'http:///login.homewatch-smarthome.de:8130/fhem';
    var metaKeywords = 'fhemweb_url';
    return {
        set: function(newTitle, newMetaDescription, newKeywords) {
            metaKeywords = newKeywords;
            metaDescription = newMetaDescription;
            title = newTitle;
        },
        metaTitle: function(){ return title; },
        metaDescription: function() { return metaDescription; },
        metaKeywords: function() { return metaKeywords; }
    }
});
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

/**
 * Created by B026789 on 12.01.2016.
 */
var service = angular.module('app.service', [])
    .service('DataService', function ($log, $http) {
        return {
            getWorkflow: function (id, responder) {
                var config = {
                    url: 'json/workflow.json',
                    cache: true,
                    method: 'GET'
                };

                $http(config)
                    .success(function (data, status, headers, config) {
                        if (responder && responder.result && typeof responder.result == "function")
                            responder.result(data);

                    })
                    .error(function (data, status, headers, config) {
                        if (responder && responder.fault && typeof responder.fault == "function")
                            responder.fault(data, status, headers, config);

                    })

            }
        }

    }());
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
/**
 * Created by B026789 on 14.12.2015.
 */
/*
(function () {
    'use strict';
    angular.module('myApp.ng.services').provider('notification', {
        defaultMessages: {},
        setDefaultMesaages: function (message) {
            this.defaultMessages = message;
        },

        $get: [function () {
            var messages = this.defaultMessages;

            function show(type, title, body) {
                if (type == 'error') {
                    toastr.error(body, title);
                } else if (type == 'warning') {
                    toastr.warning(body, title);
                } else if (type == 'success') {
                    toastr.success(body, title);
                } else {
                    toastr.info(body, title);
                }
            }

            return {
                show: function(type, title, body){
                    show(type, title, body);
                },
                showError: function(type, title, body){
                    show('error', title, body);
                },
                showWarning: function(type, title, body){
                    show('warning', title, body);
                },
                showSuccess: function(type, title, body){
                    show('success', title, body);
                },
                showSaveSuccess: function(type, title, body){
                    show('success', messages.saveSucess || 'Speicherung erfolgreich', body);
                },
                showDeleteSuccess: function(type, title, body){
                    show('success', messages.deleteSucess || 'Löschen erfolgreich', body);
                },
                showDefaultError: function(body){
                    show('success', messages.defaultError || 'Ein Feher ist aufgetreten', body);
                }
            };
        }]
    });

}());
    */