/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('CookiesService', function ($http, notification, $log, $q, $rootScope, HomeService, Jsonervice, $cookieStore) {
    {
        // set cookie with json
        this.setCookieJson = function (name) {
            let config = [];

            Jsonervice.getJson(name).then(function () {

                    config = Jsonervice.data();

                    localStorage.setItem(name, JSON.stringify(config));
                    $cookieStore.put(name, config);
                    $rootScope.config = config;
                    return config;
                })
                .catch(function (callback) {
                    $log.debug(callback);

                });
        };
        // set cookie with name and data
        this.setCookieName = function (name, data) {
            if (angular.isUndefined(name))
                return;
            // check cookie
            config = $cookieStore.get(name) || {};
            if (config.length > 0) {
                $cookieStore.remove(name);
                localStorage.removeItem(name);
            }
            localStorage.setItem(name, JSON.stringify(data));
            $cookieStore.put(name, JSON.stringify(data));
        };
        // get Cookie
        this.getCookie = function (name) {

            config = $cookieStore.get(name);
            $log.debug('CookiesService getCookie: ' + name);
            $log.debug(config);
            return config;
        };

    }
});

/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('HomeService', function ($http, notification, $log, $q, CacheService, $rootScope, Page) {
    var data = [];
    var deffered = $q.defer();
    var HomeService = {};

    HomeService.getHomeByRoom = function (room) {
        var url = $rootScope.MetaDatafhemweb_url + $rootScope.config.globals.cmd + $rootScope.config.globals.room + '=' + room + $rootScope.config.globals.param;
        $log.debug(url);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();
                $log.debug("HomeService by room");
                $log.debug(data);
            })
            .error(function (err, status, headers, config) {
                $rootScope.config.connection.internet = "false";
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
        var url = $rootScope.MetaDatafhemweb_url + $rootScope.config.globals.cmd + $rootScope.config.globals.genericDeviceType + device + $rootScope.config.globals.param;
        $log.debug(url);
        $log.debug('$rootScope.config.connection.internet: ' + $rootScope.config.connection.internet);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
            })
            .error(function (err, status, headers, config) {
                $rootScope.config.connection.internet = "false";
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
        var url = '';
        if ($rootScope.config.connection.isDebug) {
            url = 'json/homewatch/data/' + name + '.json';
        } else {
            url = $rootScope.MetaDatafhemweb_url + $rootScope.config.globals.cmd + type + '=' + name + $rootScope.config.globals.param;
        }

        $log.debug('getHome url: ' + url);
        $log.debug('name: ' + name + ' type: ' + type);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve(data);

                $log.debug("Success HomeService.getHome");
            })
            .error(function (err, status, headers, config) {
                $rootScope.config.connection.internet = "false";
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

        var url = $rootScope.MetaDatafhemweb_url + '?cmd=attr%20' + name + '%20like%20' + type + $rootScope.config.globals.param;
        $log.debug(url);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();

            })
            .error(function (err, status, headers, config) {
                $rootScope.config.connection.internet = "false";
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

    HomeService.setPreset = function (name, preset) {
        //set Cam_Demowand preset alarm
        var url = $rootScope.MetaDatafhemweb_url + '?cmd=%20set%20' + name + '%20preset%20' + preset + $rootScope.config.globals.param;
        $log.debug(url);
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();

                $log.debug("HomeService Camera set preset OK");
            })
            .error(function (err, status, headers, config) {
                $rootScope.config.connection.internet = "false";
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
        var url = 'json/homewatch/data/' + name + '.json';
        return $http({
            method: 'GET',
            url: url
        }).success(function (d) {
                data = d;
                deffered.resolve();
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
 * Created by Rainer on 03.04.2016.
 */
myApp.factory("WidgetService", function ($http, $rootScope, $log, $q) {
    "use strict";
    var widgets = [];
    return {
        getWidget: function (type, name) {
            var url = $rootScope.MetaDatafhemweb_url + $rootScope.config.globals.cmd + type + '=' + name + $rootScope.config.globals.param;
            $log.debug('WidgetService.getWidget url: ' + url);
            $log.debug('name: ' + name + ' type: ' + type);
            return $http.get(url);
        }
    }

});

/**
 * Created by Rainer on 03.04.2016.
 */
myApp.factory("FillAllDataService", function ($q, $log, $rootScope, $http, HomeService, CookiesService, WidgetService) {
    "use strict";

    var widget = {};
    return {
        loadWidgets: function (cookie) {
            widget = CookiesService.getCookie(cookie) || {};
            if (widget && widget.length && widget.length > 0) {
                return widget;
            }
            else {
                // get type and name from cookie global.home
                var config = CookiesService.getCookie('config');
                if (config.home) {
                    var home = config.home;
                    var type = '';
                    var names = '';
                    // check alias name
                    for (var i = 0; i < home.length; i++) {
                        if (home[i].alias == cookie) {
                            type = home[i].type;
                            names = home[i].name;
                            break;
                        }
                    }

                    // get widget
                    let promises = [];

                    var values = names.split(',');
                    angular.forEach(values, function (name) {

                        var url = $rootScope.MetaDatafhemweb_url + $rootScope.config.globals.cmd + type + '=' + name + $rootScope.config.globals.param;
                        $log.debug('WidgetService.getWidget url: ' + url);
                        $log.debug('name: ' + name + ' type: ' + type);

                        var deffered = $q.defer();

                        $http({
                            url: url,
                            method: 'GET'
                        }).success(function (data) {
                            deffered.resolve(data.Results);
                        }).error(function (error) {
                            deffered.reject();
                        });

                        /*
                         HomeService.getHome(name, type).then(function () {
                         var data = HomeService.data();
                         deffered.resolve(data.Results);

                         if (data.Results.length > 0) {
                         $log.debug('WidgetService.getWidget add Widgets: ' + type + ' : ' + name + ' - ' + data.Results.length);
                         $log.debug(data.Results);

                         }

                         });
                         */

                        promises.push(deffered);

                    });

                    return $q.all(promises).then(function (values) {
                        CookiesService.setCookieName(cookie, values);
                    });

                }

            }

        },
        getWidget: function homeWidgets(names, type) {

            // create a $q deferred promise
            let deferred = $q.defer();
            var promises = [];
            var values = names.split(',');

            angular.forEach(values, function (name) {
                var url = $rootScope.MetaDatafhemweb_url + $rootScope.config.globals.cmd + type + '=' + name + $rootScope.config.globals.param;
                promises.push($http.get(url));
            });

            $q.all(urlCalls)
                .then(
                    function (results) {
                        deferred.resolve(
                            JSON.stringify(results))
                    },
                    function (errors) {
                        deferred.reject(errors);
                    },
                    function (updates) {
                        deferred.update(updates);
                    });
            return deferred.promise;
        },
        // add Widget to cookie
        addWidgetToCookie: function (name, widget) {
            CookiesService.setCookieName(name, widget);
        }

    }
});
/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('Jsonervice', function ($http, notification, $log, $q, $rootScope) {
    var data = [];
    var deffered = $q.defer();
    var Jsonervice = {};

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
                if (angular.isUndefined(status)) {
                    $log.debug('error: ' + config.url);
                } else {

                    // log error
                    if (status == 500) {
                        $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                    } else if (status == 404) {
                        url = $rootScope.config.connection.originUrl + url;
                        $log.debug(url);
                    } else if (status == -1) {
                        $log.debug('error: connection refused ' + status);
                    } else {

                        $log.debug('error: ' + status);
                    }
                }


            });
    };

    Jsonervice.getJsonById = function (name, id) {

        var url = 'json/homewatch/' + name + '.json';

        return $http({
            method: 'GET',
            url: url
        }).success(function (res) {

                var len = res.Results.length;
                for (var i = 0; i < len; i++) {
                    if (res.Results[i].location == id) {
                        data = res.Results[i];
                        deffered.resolve();
                        break;
                    }
                }

                $log.debug("Jsonervice by getJsonById " + id);
                $log.debug(data);
            })
            .error(function (err, status, headers, config) {

                // log error
                if (status == 500) {
                    $log.debug('error: ' + err.exceptionMessage + ' - Status: ' + status);

                } else if (status == 404) {
                    url = $rootScope.config.connection.originUrl + url;
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

            addFavorite: function (name, like) {
                var favorit = {
                    Name: name,
                    Like: like
                };
                $log.debug(favorit);
                if (like == 'yes') {
                    HomeService.setFavorit(name, 'no');
                    $log.debug("Favorit gelöscht");
                    tbFavoriten.splice(selected_index, 1);
                    localStorage.setItem("tbFavoriten", JSON.stringify(tbFavoriten));
                    like = 'yes';
                }
                else {
                    HomeService.setFavorit(name, 'yes');
                    tbFavoriten.push(favorit);
                    localStorage.setItem("tbFavoriten", JSON.stringify(tbFavoriten));
                    $log.debug("Favorit gespeichert");
                    like = 'no';
                }


            }

        }
    }
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
    var metaDescription = 'http:///login.homewatch-smarthome.de:8139/fhem';
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
 * Created by RSC on 01.04.2016.
 */

(function () {

    'use strict';

    var module = angular.module('angularModalService', []);

    module.factory('ModalService', ['$animate', '$document', '$compile', '$controller', '$http', '$rootScope', '$q', '$templateRequest', '$timeout',
        function ($animate, $document, $compile, $controller, $http, $rootScope, $q, $templateRequest, $timeout) {

            //  Get the body of the document, we'll add the modal to this.
            var body = angular.element($document[0].body);

            function ModalService() {

                var self = this;

                //  Returns a promise which gets the template, either
                //  from the template parameter or via a request to the
                //  template url parameter.
                var getTemplate = function (template, templateUrl) {
                    var deferred = $q.defer();
                    if (template) {
                        deferred.resolve(template);
                    } else if (templateUrl) {
                        $templateRequest(templateUrl, true)
                            .then(function (template) {
                                deferred.resolve(template);
                            }, function (error) {
                                deferred.reject(error);
                            });
                    } else {
                        deferred.reject("No template or templateUrl has been specified.");
                    }
                    return deferred.promise;
                };

                //  Adds an element to the DOM as the last child of its container
                //  like append, but uses $animate to handle animations. Returns a
                //  promise that is resolved once all animation is complete.
                var appendChild = function (parent, child) {
                    var children = parent.children();
                    if (children.length > 0) {
                        return $animate.enter(child, parent, children[children.length - 1]);
                    }
                    return $animate.enter(child, parent);
                };

                self.showModal = function (options) {

                    //  Create a deferred we'll resolve when the modal is ready.
                    var deferred = $q.defer();

                    //  Validate the input parameters.
                    var controllerName = options.controller;
                    if (!controllerName) {
                        deferred.reject("No controller has been specified.");
                        return deferred.promise;
                    }

                    //  Get the actual html of the template.
                    getTemplate(options.template, options.templateUrl)
                        .then(function (template) {

                            //  Create a new scope for the modal.
                            var modalScope = (options.scope || $rootScope).$new();

                            //  Create the inputs object to the controller - this will include
                            //  the scope, as well as all inputs provided.
                            //  We will also create a deferred that is resolved with a provided
                            //  close function. The controller can then call 'close(result)'.
                            //  The controller can also provide a delay for closing - this is
                            //  helpful if there are closing animations which must finish first.
                            var closeDeferred = $q.defer();
                            var closedDeferred = $q.defer();
                            var inputs = {
                                $scope: modalScope,
                                close: function (result, delay) {
                                    if (delay === undefined || delay === null) delay = 0;
                                    $timeout(function () {
                                        //  Resolve the 'close' promise.
                                        closeDeferred.resolve(result);

                                        //  Let angular remove the element and wait for animations to finish.
                                        $animate.leave(modalElement)
                                            .then(function () {
                                                //  Resolve the 'closed' promise.
                                                closedDeferred.resolve(result);

                                                //  We can now clean up the scope
                                                modalScope.$destroy();

                                                //  Unless we null out all of these objects we seem to suffer
                                                //  from memory leaks, if anyone can explain why then I'd
                                                //  be very interested to know.
                                                inputs.close = null;
                                                deferred = null;
                                                closeDeferred = null;
                                                modal = null;
                                                inputs = null;
                                                modalElement = null;
                                                modalScope = null;
                                            });
                                    }, delay);
                                }
                            };

                            //  If we have provided any inputs, pass them to the controller.
                            if (options.inputs) angular.extend(inputs, options.inputs);

                            //  Compile then link the template element, building the actual element.
                            //  Set the $element on the inputs so that it can be injected if required.
                            var linkFn = $compile(template);
                            var modalElement = linkFn(modalScope);
                            inputs.$element = modalElement;

                            //  Create the controller, explicitly specifying the scope to use.
                            var controllerObjBefore = modalScope[options.controllerAs];
                            var modalController = $controller(options.controller, inputs, false, options.controllerAs);

                            if (options.controllerAs && controllerObjBefore) {
                                angular.extend(modalController, controllerObjBefore);
                            }

                            //  Finally, append the modal to the dom.
                            if (options.appendElement) {
                                // append to custom append element
                                appendChild(options.appendElement, modalElement);
                            } else {
                                // append to body when no custom append element is specified
                                appendChild(body, modalElement);
                            }

                            //  We now have a modal object...
                            var modal = {
                                controller: modalController,
                                scope: modalScope,
                                element: modalElement,
                                close: closeDeferred.promise,
                                closed: closedDeferred.promise
                            };

                            //  ...which is passed to the caller via the promise.
                            deferred.resolve(modal);

                        })
                        .then(null, function (error) { // 'catch' doesn't work in IE8.
                            deferred.reject(error);
                        });

                    return deferred.promise;
                };

            }

            return new ModalService();
        }]);

}());

/**
 * Created by Fabrice on 26.01.2016.
 */
myApp.factory('onlineStatus', ["$window", "$rootScope", function ($window, $rootScope) {
    var onlineStatus = {};

    onlineStatus.onLine = $window.navigator.onLine;

    onlineStatus.isOnline = function () {
        return onlineStatus.onLine;
    };

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

myApp.service('Internet', function ($http, $rootScope) {
    this.IsOk = function () {
        return $http({
            method: 'HEAD',
            url: $rootScope.config.connection.url
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
myApp.service('Page', function ($rootScope) {
    return {
        setTitle: function (title) {
            $rootScope.title = title + " - CAMDATA - HomeWatch 2.0";
        },
        setHeader: function (header) {
            $rootScope.header = header;
        },
        setMetaData: function (name, content) {
            $rootScope.MetaDatafhemweb_url = content;
        },
        getMetaData: function (name) {
            var metaData = $rootScope.MetaDatafhemweb_url;
            if (angular.isUndefined(metaData)) {
                if ($rootScope.config) {
                    metaData = $rootScope.config.connection.fhemweb_url;
                }
            }
            return metaData;
        }


    }
});
/**
 * Created by RSC on 01.04.2016.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('FlashService', FlashService);

    FlashService.$inject = ['$rootScope'];
    function FlashService($rootScope) {
        var service = {};

        service.Success = Success;
        service.Error = Error;

        initService();

        return service;

        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });

            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
    }

})();
/**
 * Created by CHE0SZR on 01.04.2016.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function () {
                var response;
                UserService.GetByUsername(username)
                    .then(function (user) {
                        if (user !== null && user.password === password) {
                            response = {success: true};
                        } else {
                            response = {success: false, message: 'Username or password is incorrect'};
                        }
                        callback(response);
                    });
            }, 1000);

            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        }

        function SetCredentials(username, password) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }

    // Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();
/**
 * Created by RSC on 01.04.2016.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('UserServiceLive', UserServiceLive);

    UserServiceLive.$inject = ['$http'];
    function UserServiceLive($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return {success: false, message: error};
            };
        }
    }

})();

/**
 * Created by RSC on 01.04.2016.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$timeout', '$filter', '$q'];
    function UserService($timeout, $filter, $q) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getUsers());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), {id: id});
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function GetByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), {username: username});
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function Create(user) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                GetByUsername(user.username)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({
                                success: false,
                                message: 'Username "' + user.username + '" is already taken'
                            });
                        } else {
                            var users = getUsers();

                            // assign id
                            var lastUser = users[users.length - 1] || {id: 0};
                            user.id = lastUser.id + 1;

                            // save to local storage
                            users.push(user);
                            setUsers(users);

                            deferred.resolve({success: true});
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        function Update(user) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        // private functions

        function getUsers() {
            if (!localStorage.users) {
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }
    }
})();