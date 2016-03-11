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
/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function ClubmitgliedschaftController($scope, $location, $rootScope, $http, $log, Page, Jsonervice) {
        $log.debug('ClubmitgliedschaftController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'Clubmitgliedschaft';
        $scope.location = '/';

        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            GetNav($scope, $http);
        };

        function GetNav($scope, $http) {
            Jsonervice.getJson('clubmitgliedschaftNav').then(function () {

                    var data = Jsonervice.data();

                    $scope.navButton = data.resultNav; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        };
    }

    ClubmitgliedschaftController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page', 'Jsonervice'];


    angular.module('myApp')
        .controller('ClubmitgliedschaftController', ClubmitgliedschaftController);
}());
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
/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function LiegenschaftenController($scope, $location, $window, $rootScope, $http, $log, Page, Jsonervice, connection, MetaService, HomeService) {
        $log.debug('LiegenschaftenController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'Liegenschaften';
        $scope.location = '/Liegenschaften';

        $scope.results = [];
        $scope.standardButton = [];

        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            GetStandard($scope, $http);
            GetSites($scope, $http);
        };

        $scope.click = function (item) {
            $rootScope.id = item.id;

            // set Page MetaData
            Page.setMetaData("fhemweb_url", item.Internals.LINK);

            var path = $scope.location + '/' + item.Name + '/home/';
            $location.path(path);
        };

        $scope.defaultClick = function (item) {
            var gotoLocation = $scope.location + '/' + item.id + '/home/';

            if (item.fhemweb_url != '') {            
                // set Page MetaData
                Page.setMetaData("fhemweb_url", item.fhemweb_url);
                $log.debug('Liegenschaften fhemweb_url: ' + $rootScope.MetaDatafhemweb_url);

                // goto location
                $log.debug('Location: ' + gotoLocation);
                $location.path(gotoLocation);
            }
            else if (item.target != '') {
                $log.debug('Url: ' + item.url);
                // $window.location.href = item.url;
                $window.open(item.url, item.target)
            } else {
                $log.debug('Location: ' + item.location);
                $location.path(item.location);
            }
        };

        function GetStandard($scope, $http) {

            Jsonervice.getJson('liegenschaftenDefault').then(function () {

                    var data = Jsonervice.data();
                    $scope.standardButton = data.result; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        }

        function GetJsonFile($scope, $http) {
            Jsonervice.getJson('Liegenschaften').then(function () {

                    var data = Jsonervice.data();

                    $scope.results = data.Liegenschaften; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        }

        function GetSites($scope, $http) {

            var value = 'site';
            var type = 'genericDeviceType';
            HomeService.getHome(value, type).then(function () {
                    $log.debug(type + ' : ' + value);
                    var data = HomeService.data();
                    $scope.results = data.Results;
                    $log.debug('$scope.result: ' + $scope.result);

                })
                .catch(function (callback) {
                    $log.debug(callback);

                    Jsonervice.getJson(value).then(function () {
                            var data = Jsonervice.data();
                            $scope.results = data.Results; // response data
                        })
                        .catch(function (callback) {
                            $log.debug(callback);
                        });

                });


        }

    }

    LiegenschaftenController.$inject = ['$scope', '$location', '$window', '$rootScope', '$http', '$log', 'Page', 'Jsonervice', 'connection', 'MetaService', 'HomeService'];


    angular.module('myApp')
        .controller('LiegenschaftenController', LiegenschaftenController);
}());
/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function ImpressumController($scope, $location, $rootScope, $http, $log, Page) {
        $log.debug('ImpressumController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'Impressum';
        $scope.location = '/';

        $scope.ImpressumButton = [];

        // set Page Title
        Page.setTitle($scope.header);
    }

    ImpressumController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page'];


    angular.module('myApp')
        .controller('ImpressumController', ImpressumController);
}());
/**
 * Created by B026789 on 03.12.2015.
 */
(function () {
    'use strict';
    function HomeController($scope, $location, $window, $rootScope, $http, $log, $routeParams, Page, Jsonervice, HomeService) {
        $log.debug('HomeController startet');
        $log.debug($routeParams);
        $log.debug($rootScope);
        var self = this;
        $scope.header = 'Home';
        $scope.location = '/Liegenschaften';

        $scope.home = [];
        $scope.navLeft = [];

        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            GetNavLeft($scope, $http);
            GetJsonFile($scope, $http);
        };

        $scope.buttonClick = function (item) {
            $log.debug('nav-click: ');
            $log.debug(item);

            $rootScope.headerImage = item.headerImage;

            $rootScope.alias = item.alias;
            $rootScope.name = item.name;
            $rootScope.type = item.type;
            var path = $scope.location + '/' + $routeParams.id + '/home' + item.buttonClick;
            $location.path(path);
        };

        $scope.defaultClick = function (item) {
            if (item.target != '') {
                $log.debug('Url: ' + item.url);
                // $window.location.href = item.url;
                $window.open(item.url, item.target)
            } else {
                $log.debug('Location: ' + item.location);
                $location.path(item.location);
            }
        };

        // Left Navigation
        function GetNavLeft($scope, $http) {

            var value = 'sidebar_left';
            var type = 'room';
            HomeService.getHome(value, type).then(function () {
                    $log.debug(type + ' : ' + value);
                    var data = HomeService.data();
                    $scope.navLeft = data.Results;
                    $log.debug('$scope.result.length: ' + $scope.navLeft.length);

                })
                .catch(function (callback) {
                    $log.debug(callback);

                    Jsonervice.getJson('navigationLeft').then(function () {
                            var data = Jsonervice.data();
                            $scope.navLeft = data.resultNav; // response data
                        })
                        .catch(function (callback) {
                            $log.debug(callback);
                        });

                });


        }


        function GetJsonFile($scope, $http) {
            Jsonervice.getJson('home').then(function () {

                    var data = Jsonervice.data();

                    $scope.home = data.home; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        };


    }

    HomeController.$inject = ['$scope', '$location', '$window', '$rootScope', '$http', '$log', '$routeParams', 'Page', 'Jsonervice', 'HomeService'];


    angular.module('myApp')
        .controller('HomeController', HomeController);
}());
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
/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function MeineDatenController($scope, $location, $rootScope, $http, $log, Page, Jsonervice) {
        $log.debug('MeineDatenController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'MeineDaten';
        $scope.location = '/';

        // set Page Title
        Page.setTitle($scope.header);

        $scope.result = [];
        $scope.navButton = [];

        $scope.init = function () {
            GetNav($scope, $http);
            GetJsonFile($scope, $http);

        };

        function GetNav($scope, $http) {
            Jsonervice.getJson('meineDatenNav').then(function () {

                    var data = Jsonervice.data();

                    $scope.navButton = data.resultNav; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        };

        function GetJsonFile($scope, $http) {
            Jsonervice.getJson('meineDaten').then(function () {

                    var data = Jsonervice.data();

                    $scope.result = data.result[0]; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        };
    }

    MeineDatenController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page', 'Jsonervice'];


    angular.module('myApp')
        .controller('MeineDatenController', MeineDatenController);
}());
/**
 * Created by Rainer on 09.01.2016.
 */


(function () {
    'use strict';
    function SecureController($scope, $location, $rootScope, $http, $log, Page, Jsonervice) {
        $log.debug('SecureController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'Secure';
        $scope.location = '/';

        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            GetNav($scope, $http);
        };

        function GetNav($scope, $http) {
            Jsonervice.getJson('secureNav').then(function () {

                    var data = Jsonervice.data();

                    $scope.navButton = data.resultNav; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        };
    }

    SecureController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page', 'Jsonervice'];


    angular.module('myApp')
        .controller('SecureController', SecureController);
}());
/**
 * Created by B026789 on 03.12.2015.
 */
(function () {
    'use strict';
    function LogonController($scope, $location, $rootScope, $http, $log, Page) {
        $log.debug( 'LogonController gestartet!');

        var self = this;

// create a message to display in our view
        $scope.company = "CAMDATA";
        $scope.showModal = false;

        $scope.LogonButton = [];

        // set Page Title
        Page.setTitle("");

        $scope.init = function () {
            //LogonService.IsOnline
            //GetJsonFile($scope, $http);
        };

        $scope.startLiegenschaften = function () {
            var name = "/Liegenschaften";
            $location.path(name);
        };

        function GetJsonFile($scope, $http) {
            $http({
                method: 'POST',
                url: 'json/LogonButton.json'
            }).success(function (data) {
                    $scope.LogonButton = data.LogonButton; // response data
                })
                .error(function (data, status) {
                    // log error
                    console.log('error: ' + status);
                });
        }

    }

    LogonController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log','Page'];


    angular.module('myApp')
        .controller('LogonController', LogonController);
}());
/**
 * Created by B026789 on 03.12.2015.
 */
(function () {
    'use strict';
    function VerwaltungController($scope, $location, $window, $rootScope, $http, $log, $routeParams, Page, Jsonervice) {
        $log.debug('VerwaltungController startet');
        $log.debug($routeParams);
        $log.debug($rootScope);
        var self = this;
        $scope.header = 'Verwaltung';
        $scope.location = '/Liegenschaften';

        $scope.result = [];
        $scope.navButton = [];

        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            GetNav($scope, $http);
            GetJsonFile($scope, $http);
        };

        $scope.buttonClick = function (item) {
            $log.debug('nav-click: ');
            $log.debug(item);

            $rootScope.alias = item.alias;
            $rootScope.name = item.name;
            $rootScope.type = item.type;
            var path = $scope.location + '/' + $routeParams.id + '/home' + item.buttonClick;
            $location.path(path);
        };

        $scope.defaultClick = function (item) {
            $log.debug('Click: ' + item.url);
            if (item.target != '') {
               // $window.location.href = item.url;
                $window.open(item.url, item.target)
            } else {
                $location.path(item.url);
            }
        };

        function GetNav($scope, $http) {
            Jsonervice.getJson('verwaltungNav').then(function () {

                    var data = Jsonervice.data();

                    $scope.navButton = data.verwaltungNav; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        };


        function GetJsonFile($scope, $http) {
            Jsonervice.getJson('verwaltung').then(function () {

                    var data = Jsonervice.data();

                    $scope.result = data.result; // response data

                })
                .catch(function (callback) {
                    $log.debug(callback);

                });

        };


    }

    VerwaltungController.$inject = ['$scope', '$location', '$window', '$rootScope', '$http', '$log', '$routeParams', 'Page', 'Jsonervice'];


    angular.module('myApp')
        .controller('VerwaltungController', VerwaltungController);
}());
/**
 * Created by B026789 on 03.12.2015.
 */
(function () {
    'use strict';
    function UserController($scope, $location, $rootScope, $http) {

        $scope.message = 'Vermittler! alles zur Agentur.';
        $rootScope.theme = 'ngdialog-theme-default';
        $scope.showModal = false;

        $scope.tabs = [{
            title: 'Adresse',
            url: 'one.tpl.html'
        }, {
            title: 'Agentur',
            url: 'two.tpl.html'
        }, {
            title: 'In Kooperation mit:',
            url: 'three.tpl.html'
        }];

        $scope.currentTab = 'one.tpl.html';

        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.url;
        };

        $scope.isActiveTab = function (tabUrl) {
            return tabUrl == $scope.currentTab;
        };

        $scope.data = [];
        $scope.init = function () {

            $http.get('json/userProfile.json').then(
                function (response) {
                    console.log(response);
                    $scope.userAddress = response.data.result;
                },
                function (error) {
                }
            );

            $http.get('json/agentur.json').then(
                function (response) {
                    console.log(response);
                    $scope.userAgentur = response.data.result;
                },
                function (error) {
                }
            );

            $http.get('json/anotherAgency.json').then(
                function (response) {
                    console.log(response);
                    $scope.anotherAgency = response.data.result;
                },
                function (error) {
                }
            );

        };


        $scope.click = function (name) {
            $location.path(name);
        };

    }

    UserController.$inject = ['$scope', '$location', '$rootScope', '$http'];

    UserController.resolve = {};

    angular.module('myApp')
        .controller('UserController', UserController);

}());
/**
 * Created by Rainer on 09.01.2016.
 */
(function () {
    'use strict';
    function HomeAllController($scope, $location, $rootScope, $http, $log, $q, $routeParams, Page, HomeService, FavoritenService, Jsonervice, RoomService) {
        $log.debug('HomeAllController startet');
        var self = this;
        $scope.header = $routeParams.name;
        $scope.location = '/Liegenschaften';
        $log.debug($rootScope);
        $log.debug($routeParams);

        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            $log.debug('HomeAll fhemweb_url: ' + $rootScope.MetaDatafhemweb_url);
            $scope.rooms = [];
            $scope.navRightButton = [];
            $scope.result = [];

            GetNavRight($scope, $http);
            GetFhemJsonFile($scope, $http);
        };

        $scope.buttonNavClick = function (title) {
            var path = '/home/' + $rootScope.id + '/' + $rootScope.name + title;
            $location.path(path);
        };

        // Navigation Left
        function GetNavLeft($scope, result) {
            $log.debug('start NavLeft getRooms');
            $scope.headerImage = $rootScope.headerImage;
            $log.debug($scope.headerImage);
            $scope.rooms = RoomService.getRooms(result);
            $log.debug($scope.rooms);
        }

        // Navigation Right
        function GetNavRight($scope, $http) {
            $scope.headerImage = $rootScope.headerImage;

            var value = 'sidebar_right';
            var type = 'room';
            HomeService.getHome(value, type).then(function () {
                    $log.debug(type + ' : ' + value);
                    var data = HomeService.data();
                    $scope.navRight = data.Results;
                    $log.debug('$scope.navRight.length: ' + $scope.navRight.length);

                })
                .catch(function (callback) {
                    $log.debug(callback);

                    Jsonervice.getJson('sidebar_right').then(function () {
                            var data = Jsonervice.data();
                            $scope.navRight = data.Results; // response data
                        })
                        .catch(function (callback) {
                            $log.debug(callback);
                        });

                });


        }


        // Widget Content
        function GetFhemJsonFile($scope, $http) {
            // list of all promises
            var promises = [];

            var values = $rootScope.name.split(',');
            angular.forEach(values, function (value) {

                // create a $q deferred promise
                var deferred = $q.defer();

                HomeService.getHome(value, $rootScope.type).then(function () {
                        $log.debug('HomeAll: ' + $rootScope.type + ' : ' + value);
                        var data = HomeService.data();
                        $scope.result.push(data.Results);


                        // promise successfully resolved
                        deferred.resolve(data);
                    })
                    .catch(function (callback) {
                        $log.debug(callback);

                        HomeService.getHomeByIdJson(value).then(function () {
                                $log.debug('getHomeByIdJson: ' + value);
                                var data = HomeService.data();
                                $scope.result.push(data.Results);


                            })
                            .catch(function (callback) {
                                $log.debug(callback);
                            });

                    });
                // add to the list of promises
                promises.push(deferred.promise);
            });

            // execute all the promises and do something with the results
            $q.all(promises).then(
                function (results) {
                    $log.debug('$scope.result.length 2:' + $scope.result.length);

                    GetNavLeft($scope, $scope.result);

                },
                // error
                function (response) {
                }
            );
        }

    }

    HomeAllController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', '$q', '$routeParams', 'Page', 'HomeService', 'FavoritenService', 'Jsonervice', 'RoomService'];


    angular.module('myApp')
        .controller('HomeAllController', HomeAllController);
}());