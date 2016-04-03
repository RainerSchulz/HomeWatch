/**
 * Created by B026789 on 15.12.2015.
 */
(function () {
    'use strict';
    angular.module('hw.ng.directives', ['ui-router', 'sf.virtualScroll', 'ui-select', 'ngToast']);
}());
/**
 * Created by B026789 on 16.12.2015.
 */
angular.module('myApp')
    .directive('cndLoginDialog', function factory($log, AUTH_EVENTS) {
        var directiveDefinitionObject = {
            restrict: 'A',
            templateUrl: 'templates/login/index.html',

            link: function (scope) {
                var showDialog = function () {
                    scope.visible = true;
                };

                scope.visible = false;
                scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
                scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
            }
        };

        return directiveDefinitionObject;
    })
;
/**
 * Created by B026789 on 16.12.2015.
 */
angular.module('myApp')
    .directive('cndSidebar_Preference', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/preference/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            sidebar_preference: {},

            scope: {
                ngSidebarPreference: "@"
            },
            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.sidebar_preference = JSON.parse($scope.ngSidebarPreference);
                    $log.debug('Start Sidebar_Preference');
                },
                post: function postLink($scope, element, attrs, controller) {
                    i$scope.buttonClick = function (item) {
                        if (item.Internals.LINK != '') {
                            $log.debug('Url: ' + item.Internals.LINK);
                            // $window.location.href = item.url;
                            $window.open(item.Internals.LINK, item.target)
                        } else {
                            $log.debug('Location: ' + item.Attributes.icon);
                            $location.path(item.Attributes.icon);
                        }

                    };
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndNavigationsLeft', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/left/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            sidebar_left: {},

            scope: {
                ngNavButton: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.sidebar_left = JSON.parse($scope.ngNavButton);
                $log.debug('Start NavigationsLeft');
                $scope.buttonClick = function (item) {
                    if (item.Internals.LINK != '') {
                        $log.debug('Url: ' + item.Internals.LINK);
                        // $window.location.href = item.url;
                        $window.open(item.Internals.LINK, item.target)
                    } else {
                        $log.debug('Location: ' + item.Attributes.icon);
                        $location.path(item.Attributes.icon);
                    }

                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndNavigationsRooms', function factory($compile, $log, $location, $window, RoomService, $rootScope, $q) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/left_rooms/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            rooms: {},

            scope: {
                ngHeaderImage: "@"
            },

            link: function ($scope, element, attrs) {

                $q.all($rootScope.rooms).then(function (rooms) {
                        $scope.rooms = rooms.promise;
                        $log.debug($scope.rooms);
                    },
                    // error
                    function (response) {
                        $log.debug('Failed: ' + response);
                    }
                );

                $scope.headerImage = $scope.ngHeaderImage;
                $log.debug('Start left home nav: ' + $scope.headerImage);
                $scope.buttonNavClick = function (room) {
                    $log.debug(room);
                    $rootScope.currentRoom = room;
                    $scope.isActive = 'active';
                    //jcu
                    $rootScope.filterRoom = [room.room];
                };

                $scope.buttonNavDisplayAllClick = function () {
                    //jcu
                    $rootScope.filterRoom = [];
                    $rootScope.currentRoom = [];
                };

                $scope.isActiveTab = function (room) {
                    //alert(room);
                    if (angular.isUndefined($rootScope.currentRoom.room)) {
                        return false;
                    }

                    var res = room == $rootScope.currentRoom.room;

                    return res;
                };
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndNavigationsRight', function factory($log, $rootScope, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/right/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            navRight: {},

            scope: {
                ngNavRight: "@"
            },

            link: function ($scope, element, attrs) {
                $log.debug('Start NavigationsRight');
                if ($scope.ngNavRight != '') {

                    $scope.navRight = JSON.parse($scope.ngNavRight);
                }

                $scope.buttonClick = function (item) {
                    $rootScope.Link = item.Internals.LINK;
                    $log.debug('Url: ' + item.Internals.LINK);
                    $log.debug('Location: ' + item.Attributes.icon);
                    if (item.Internals.LINK != '') {
                        // $window.location.href = item.url;
                        $window.open(item.Internals.LINK)
                    } else {
                        $location.path(item.Attributes.icon);
                    }

                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndNavigationsRightTop', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/right/top/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            navRightTop: {},

            scope: {
                ngNavRightTop: "@"
            },

            link: function ($scope, element, attrs) {
                if ($scope.ngNavRightTop != '') {
                    $scope.navRightTop = JSON.parse($scope.ngNavRightTop);
                }

                $scope.buttonClick = function (item) {
                    if (item.target != '') {
                        $log.debug('Url: ' + item.url);
                        // $window.location.href = item.url;
                        $window.open(item.url, item.target)
                    } else {
                        $log.debug('Location: ' + item.location);
                        $location.path(item.location);
                    }

                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndNavigationsTop', function factory($log, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/top/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            header: 'Liegenschaften',
            location: '/Liegenschaften',

            scope: {
                ngHeader: "@",
                ngLocation: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.header = $scope.ngHeader;
                $scope.location = $scope.ngLocation;

                $scope.goBack = function () {
                    $window.history.back();
                }
            }
        };


        return directiveDefinitionObject;
    })

;
/**
 * Created by B026789 on 18.12.2015.
 */
(function () {
    "use strict";

    angular.module('notification', [])
        .service('notification', function ($rootScope) {
            this.pop = function (type, title, body) {
                this.toast = {
                    type: type,
                    title: title,
                    body: body
                };
                $rootScope.$broadcast('toaster-newToast');
            };
        })
        .constant('toasterConfig', {
            'tap-to-dismiss': true,
            'newest-on-top': true,
            //'fade-in': 1000,            // done in css
            //'on-fade-in': undefined,    // not implemented
            //'fade-out': 1000,           // done in css
            // 'on-fade-out': undefined,  // not implemented
            //'extended-time-out': 1000,    // not implemented
            'time-out': 5000, // Set timeOut and extendedTimeout to 0 to make it sticky
            'icon-classes': {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            'icon-class': 'toast-info',
            'position-class': 'toast-top-right',
            'title-class': 'toast-title',
            'message-class': 'toast-message'
        })
        .directive('toasterContainer', ['$compile', '$timeout', 'toasterConfig', 'notification',
            function ($compile, $timeout, toasterConfig, toaster) {
                return {
                    replace: true,
                    restrict: 'EA',
                    link: function (scope, elm, attrs) {

                        var id = 0;

                        var mergedConfig = toasterConfig;
                        if (attrs.toasterOptions) {
                            angular.extend(mergedConfig, scope.$eval(attrs.toasterOptions));
                        }

                        scope.config = {
                            position: mergedConfig['position-class'],
                            title: mergedConfig['title-class'],
                            message: mergedConfig['message-class'],
                            tap: mergedConfig['tap-to-dismiss']
                        };

                        function addToast(toast) {
                            toast.type = mergedConfig['icon-classes'][toast.type];
                            if (!toast.type)
                                toast.type = mergedConfig['icon-class'];

                            id++;
                            angular.extend(toast, {id: id});

                            if (mergedConfig['time-out'] > 0)
                                setTimeout(toast, mergedConfig['time-out']);

                            if (mergedConfig['newest-on-top'] === true)
                                scope.toasters.unshift(toast);
                            else
                                scope.toasters.push(toast);
                        }

                        function setTimeout(toast, time) {
                            toast.timeout = $timeout(function () {
                                scope.removeToast(toast.id);
                            }, time);
                        }

                        scope.toasters = [];
                        scope.$on('toaster-newToast', function () {
                            addToast(toaster.toast);
                        });
                    },
                    controller: function ($scope, $element, $attrs) {

                        $scope.stopTimer = function (toast) {
                            if (toast.timeout)
                                $timeout.cancel(toast.timeout);
                        };

                        $scope.removeToast = function (id) {
                            var i = 0;
                            for (i; i < $scope.toasters.length; i++) {
                                if ($scope.toasters[i].id === id)
                                    break;
                            }
                            $scope.toasters.splice(i, 1);
                        };

                        $scope.remove = function (id) {
                            if ($scope.config.tap === true) {
                                $scope.removeToast(id);
                            }
                        };
                    },
                    template: '<div  id="toast-container" ng-class="config.position">' +
                    '<div ng-animate="\'animateToaster\'" ng-repeat="toaster in toasters">' +
                    '<div class="toast" ng-class="toaster.type" ng-click="remove(toaster.id)" ng-mouseover="stopTimer(toaster)">' +
                    '<div ng-class="config.title">{{toaster.title}}</div>' +
                    '<div ng-class="config.message">{{toaster.body}}' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                };
            }]);
}());
/**
 * Created by B026789 on 18.12.2015.
 */
(function () {
    "use strict";

    var dirTooltip = angular.module('tooltip', [])
        .directive('tooltip', function factory($log) {
            return {
                restrict: 'A',

                link: function (scope, element, attrs) {

                    $(element).hover(function () {
                        // on mouseenter
                        $(element).tooltip('show');
                    }, function () {
                        // on mouseleave
                        $(element).tooltip('hide');
                    });
                }
            };
        });
}());
/**
 * Created by RSC on 16.01.2016.
 */
angular.module('myApp')
    // switch
    .directive('cndWidgetsSwitchGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/switch_gira/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsSwitch', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/switch/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsSwitchHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/switch_hm/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    // dimmer
    .directive('cndWidgetsDimmerGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/dimmer_gira/index.html',
            replace: true,
            transclude: true,
            restrict: 'EA',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsDimmerHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/dimmer_hm/index.html',
            replace: true,
            transclude: true,
            restrict: 'EA',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsDimmer', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/dimmer/index.html',
            replace: true,
            transclude: true,
            restrict: 'EA',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    // window
    .directive('cndWidgetsWindowGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/window_gira/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsWindowHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/window_hm/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    // blind
    .directive('cndWidgetsBlindGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/blind_gira/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsBlindHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/blind_hm/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    // light
    .directive('cndWidgetsLightGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/light_gira/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsLightHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/light_hm/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsLight', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/light/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    // heating
    .directive('cndWidgetsHeatingGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/heating_gira/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsHeatingHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/heating_hm/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    // motion
    .directive('cndWidgetsMotionGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/motion_gira/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsMotionHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/motion_hm/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    // smoke
    .directive('cndWidgetsSmokeGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/smoke_gira/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsSmokeHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/smoke_hm/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    // water
    .directive('cndWidgetsWaterGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/water_gira/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsWaterHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/water_hm/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    // energy
    .directive('cndWidgetsEnergyHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/energy_hm/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })

    .directive('cndWidgetsVolume', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/volume/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsContact', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/dummy_sec/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsSensor', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/sensor/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsActor', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/actor/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsThermostat', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/heating_hm/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsAircon', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/aircon/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsPush', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/push/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsSymbol', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/symbol/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsDefault', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/default/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsDummySec', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/dummy_sec/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            Attributes: {},

            scope: {
                ngName: "@",
                ngAttributes: "@"

            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.Attributes = JSON.parse($scope.ngAttributes);
                    $scope.Name = $scope.ngName;

                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.Name);
                }
            }
        };

        return directiveDefinitionObject;
    })

;
/**
 * Created by RSC on 16.01.2016.
 */
angular.module('myApp')
    .directive('cndWidgetsFields', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/fields/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            model: {},

            scope: {
                ngKind: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.model = JSON.parse($scope.ngKind);
                //$log.debug($scope.model);
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsCamera', function factory($log, Lightbox, HomeService) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/camera/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            model: {},

            scope: {
                ngKind: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.model = JSON.parse($scope.ngKind);

                $scope.openModalImage = function (imageSrc, presets, imageName) {
                    $scope.images = [
                        {
                            'url': imageSrc
                        }
                    ];
                    $scope.imageUrl = imageSrc;
                    $scope.items = [];
                    var values = presets.Value.split(',');
                    angular.forEach(values, function (value) {
                        $scope.items.push({
                            preset: value,
                            name: imageName
                        });

                    });
                    Lightbox.imageName = imageName;
                    Lightbox.value = '';
                    Lightbox.presets = $scope.items;

                    $log.debug($scope.items);

                    // Preset setzen
                    Lightbox.SetPreset = function (preset) {

                        $log.debug('Start set presets ' + preset + ' image: ' + imageName);
                        HomeService.setPreset(imageName, preset);

                    };
                    Lightbox.reload = function (imgUrl) {

                        $log.debug('reload ' + imgUrl);
                        Lightbox.imageUrl = imgUrl;

                    };

                    Lightbox.openModal($scope.images, 0);

                };
            }
        };

        return directiveDefinitionObject;
    })
    .directive('cndWidgetsSite', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/site/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            model: {},

            scope: {
                ngKind: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.model = JSON.parse($scope.ngKind);
                //$log.debug($scope.model);
            }
        };

        return directiveDefinitionObject;
    })
;
/**
 * Created by RSC on 11.03.2016.
 */
angular.module('myApp')
.directive('cndWidgetsFavoriten', function factory($log, FavoritenService) {

        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/favoriten/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',

            scope: {
                ngName: "@",
                ngLike: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.name = $scope.ngName;
                
                if (angular.isUndefined($scope.ngLike) || $scope.ngLike == '') {
                    $scope.isFavorit = 'no';
                }
                else {
                    $scope.isFavorit = $scope.ngLike;
                }
                $log.debug($scope.name + ' - ' + $scope.isFavorit);

                $scope.setFavorite = function (name, isFavorit) {
                    $log.debug('isFavorit = ' + isFavorit);
                    FavoritenService.addFavorite(name, isFavorit);
                    $scope.isFavorit = isFavorit == 'yes' ? 'no' : 'yes';
                };
            }
        };

        return directiveDefinitionObject;
    });