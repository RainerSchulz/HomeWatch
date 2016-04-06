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
 * Created by Rainer on 29.01.2016.
 */
(function () {
    'use strict';
    function HomeController($scope, $location, $q, $rootScope, $log, $routeParams, Page, HomeWatchFactory) {
        $log.debug('HomeController startet');

        var self = this;
        $scope.header = 'Home';
        $scope.location = '/Liegenschaften';

        $scope.home = [];
        $scope.sidebar_left = [];

        // set Page Title
        Page.setTitle($scope.header);

        // Init
        $scope.init = function () {

            if (!$rootScope.MetaDatafhemweb_url) {
                Page.setMetaData('fhemweb_url', $rootScope.config.connection.fhemweb_url);
            }
            GetSidebar($scope);
            GetHomeContent($scope);
        };

        $scope.buttonClick = function (item) {
            $log.debug('nav-click: ');
            $log.debug(item);

            $rootScope.headerImage = item.headerImage;

            $rootScope.alias = item.alias;
            $rootScope.name = item.name;
            $rootScope.type = item.type;
            var path = $scope.location + '/' + $routeParams.id + '/home/' + item.location;
            $location.path(path);
        };

        // get sidebar left from service jsonlist
        function GetSidebar($scope) {
            var name = 'sidebar_left';
            var type = 'room';
            $scope.sidebar_left = HomeWatchFactory.getFhemJsonList(name, type);
            //the model returns a promise and THEN items
            $scope.sidebar_left.then(function (data) {
                $scope.sidebar_left = data.Results;
            }, function (status) {
                $log.debug(status);
            });
        }

        // get home widgets from json file
        function GetHomeContent($scope) {
            var name = 'home';
            $scope.home = HomeWatchFactory.getJson(name);
            //the model returns a promise and THEN items
            $scope.home.then(function (data) {
                $scope.home = data.Results;
            }, function (status) {
                $log.debug(status);
            });
        }
    }

    HomeController.$inject = ['$scope', '$location', '$q', '$rootScope', '$log', '$routeParams', 'Page', 'HomeWatchFactory'];


    angular.module('myApp')
        .controller('HomeController', HomeController);
}());
/**
 * Created by Rainer on 09.01.2016.
 */

(function () {
    'use strict';
    function LiegenschaftenController($scope, $location, $window, $rootScope, $http, $log, Page, HomeWatchFactory) {
        $log.debug('LiegenschaftenController startet');
        var self = this;

// create a message to display in our view
        $scope.header = 'Liegenschaften';
        $scope.location = '/Liegenschaften';

        $scope.sites = [];
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
            Page.setMetaData("fhemweb_url", item.Internals.LINK + $rootScope.config.globals.fhem);
            $log.debug("LiegenschaftenController fhemweb_url:" + Page.getMetaData('fhemweb_url'));
            var path = $scope.location + '/' + item.Name + '/home/';
            $location.path(path);
        };

        $scope.standardClick = function (item) {
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
            }
            else {
                $log.debug('Location: ' + item.location);
                $location.path(item.location);
            }
        };

        // der untere Bereich unterhalb der Linie, werden aus einer Json Datei geholt
        function GetStandard($scope, $http) {

            var name = 'liegenschaftenDefault';
            $scope.standardButton = HomeWatchFactory.getJson(name);
            //the model returns a promise and THEN items
            $scope.standardButton.then(function (data) {
                $scope.standardButton = data.Results
            }, function (status) {
                $log.debug(status);
            });
        }

        // die Liegenschaften werden über einen Service Jsonlist geholt
        function GetSites($scope, $http) {

            // prüfen ob die Metadaten gefüllt sind
            if (!$rootScope.MetaDatafhemweb_url) {
                Page.setMetaData('fhemweb_url', $rootScope.config.connection.fhemweb_url);
            }

            var name = 'site';
            var type = 'genericDeviceType';
            $scope.sites = HomeWatchFactory.getFhemJsonList(name, type);
            //the model returns a promise and THEN items
            $scope.sites.then(function (data) {
                $scope.sites = data.Results
            }, function (status) {
                $log.debug(status);
            });
        }

    }

    LiegenschaftenController.$inject = ['$scope', '$location', '$window', '$rootScope', '$http', '$log', 'Page', 'HomeWatchFactory'];


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
    function LogonController($scope, $location, $rootScope, $http, $log, Page, ModalService, CookiesService) {
        $log.debug('LogonController gestartet!');

        var self = this;

// create a message to display in our view
        $scope.company = "CAMDATA";
        $scope.showModal = false;

        $scope.location = "/Liegenschaften";
        $scope.LogonButton = [];

        // set Page Title
        Page.setTitle("Login");

        $scope.init = function () {
            // load config.json to cookies
            $rootScope.config = CookiesService.getCookie('config') || {};
            if (!$rootScope.config.globals) {
                CookiesService.setCookieJson('config');
            }
            Page.setMetaData("fhemweb_url", $rootScope.config.connection.fhemweb_url);
            $log.debug('fhemweb_url' +  $rootScope.config.connection.fhemweb_url)
        };

        $scope.startLiegenschaften = function () {
            $log.debug($rootScope.config);
            $location.path($scope.location);
        };

        $scope.login = function () {

            ModalService.showModal({
                templateUrl: "views/login/index_modal.html",
                controller: "LoginController"
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    $location.path("logon");
                });
            });

        };

    }

    LogonController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', 'Page', 'ModalService', 'CookiesService'];


    angular.module('myApp')
        .controller('LogonController', LogonController);
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
    function VerwaltungController($scope, $location, $window, $rootScope, $q, $log, $routeParams, Page, HomeWidgetsService) {
        $log.debug('VerwaltungController startet');
        $log.debug($routeParams);
        $log.debug($rootScope);
        var self = this;
        $scope.header = 'Verwaltung';
        $scope.location = '/Liegenschaften';

        $rootScope.sidebar_left = $q.defer();
        $rootScope.sidebar_preference = $q.defer();


        // set Page Title
        Page.setTitle($scope.header);

        $scope.init = function () {
            $rootScope.sidebar_left.resolve(HomeWidgetsService.getHomeSidebar('sidebar_left'));
            $rootScope.sidebar_preference.resolve(HomeWidgetsService.getHomeSidebar('sidebar_preference'));
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
    }

    VerwaltungController.$inject = ['$scope', '$location', '$window', '$rootScope', '$q', '$log', '$routeParams', 'Page', 'HomeWidgetsService'];


    angular.module('myApp')
        .controller('VerwaltungController', VerwaltungController);
}());
/**
 * Created by RSC on 03.03.2016.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', '$scope', '$element'];
    function LoginController($location, AuthenticationService, FlashService, $scope, $element) {
        var vm = this;

        //  This close function doesn't need to use jQuery or bootstrap, because
        //  the button has the 'data-dismiss' attribute.
        $scope.close = function () {
            close({
                name: $scope.name,
                age: $scope.age
            }, 500); // close, but give 500ms for bootstrap to animate
        };

        //  This cancel function must use the bootstrap, 'modal' function because
        //  the doesn't have the 'data-dismiss' attribute.
        $scope.cancel = function () {

            //  Manually hide the modal.
            $element.modal('hide');

            //  Now call close, returning control to the caller.
            close({
                name: $scope.name,
                age: $scope.age
            }, 500); // close, but give 500ms for bootstrap to animate
        };

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }
    }

})();
/**
 * Created by RSC on 30.03.2016.
 */
(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
/**
 * Created by Rainer on 09.02.2016.
 */
(function () {
    'use strict';
    function WidgetsController($scope, $location, $rootScope, $http, $log, $q, $routeParams, Page, HomeWatchFactory, RoomService, FillAllDataService, HomeWidgetsService, CookiesService) {
        $log.debug('WidgetsController startet');

        $scope.header = $routeParams.name;
        $scope.location = '/Liegenschaften';

        $rootScope.currentRoom = 'all';
        $rootScope.location = $routeParams.name;

        // set Page Title
        Page.setTitle($scope.header);

        // Init
        $scope.init = function () {
            $scope.headerImage = $rootScope.headerImage;

            $log.debug('HomeAll fhemweb_url: ' + $rootScope.MetaDatafhemweb_url);

            $rootScope.home = [];
            $scope.sidebar_right = [];
            $scope.sidebar_right_top = [];

            $rootScope.rooms = $q.defer();

            $rootScope.filterRoom = [];

            $scope.result = [];
            $scope.headerImage = $rootScope.headerImage;

            // get HomeWidgets
            $rootScope.homeWidgets = $q.defer();

            GetHomeWidgets($scope, $rootScope);
            GetSidebarRight($scope);

        };

        $scope.roomFilter = function (item) {
            if ($scope.filterRoom.length == 0) {
                return true;
            }
            return $scope.filterRoom.indexOf(item.Attributes.room) > -1;
        };

        // Navigation Left Rooms
        function GetRoomsLeft(widgets) {
            $log.debug('start GetRoomsLeft' + widgets.length);
            $rootScope.rooms.resolve(RoomService.getRooms(widgets));
        }


        // get sidebar right from service jsonlist
        function GetSidebarRight($scope) {
            var name = 'sidebar_right';
            var type = 'room';
            $scope.sidebar_right = HomeWatchFactory.getFhemJsonList(name, type);
            //the model returns a promise and THEN items
            $scope.sidebar_right.then(function (data) {
                $scope.sidebar_right = data.Results;
                $scope.sidebar_right_top = data.Results;
            }, function (status) {
                $log.debug(status);
            });
        }

        function GetHomeWidgets($scope, $rootScope) {
            // get widgets from cookie
            var location = $routeParams.name;

            $rootScope.homeWidgets = HomeWatchFactory.getLocationWidgets(location);
            //the model returns a promise and THEN items
            $rootScope.homeWidgets.then(function (data) {
                var name = data.name;
                var type = data.type;
                var names = name.split(',');

                var deferred = $q.defer();
                angular.forEach(names, function (value) {
                    $rootScope.homeWidgets = HomeWatchFactory.getFhemJsonList(value, type);
                    //the model returns a promise and THEN items
                    $rootScope.homeWidgets.then(function (response) {
                        $scope.result.push(response.Results);
                        GetRoomsLeft($scope.result);

                    }, function (status) {
                        $log.debug(status);
                    });
                });

                $q.all($scope.result).then(function () {
                })


            }, function (status) {
                $log.debug(status);
            });

        }

    }

    WidgetsController.$inject = ['$scope', '$location', '$rootScope', '$http', '$log', '$q', '$routeParams', 'Page', 'HomeWatchFactory', 'RoomService', 'FillAllDataService', 'HomeWidgetsService', 'CookiesService'];


    angular.module('myApp')
        .controller('WidgetsController', WidgetsController);
}());