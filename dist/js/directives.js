/**
 * Created by B026789 on 15.12.2015.
 */
(function () {
    'use strict'
    angular.module('hw.ng.directives', ['ui-router', 'sf.virtualScroll', 'ui-select', 'ngToast']);
}());
/**
 * Created by B026789 on 16.12.2015.
 */
angular.module('myApp')
    .directive('myIframe', function () {
        var linkFn = function (scope, element, attrs) {
            element.find('iframe').bind('load', function (event) {
                event.target.contentWindow.scrollTo(0, 400);
            });
        };
        return {
            restrict: 'EA',
            scope: {
                src: '@src',
                height: '@height',
                width: '@width',
                scrolling: '@scrolling'
            },
            templateUrl: '<iframe class="frame" height="{{height}}" width="{{width}}" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="{{scrolling}}" src="{{src}}"></iframe>',
            link: linkFn
        };
    });
/**
 * Created by B026789 on 18.12.2015.
 */
(function(){
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
                    link: function (scope, elm, attrs){

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

                        function addToast (toast){
                            toast.type = mergedConfig['icon-classes'][toast.type];
                            if (!toast.type)
                                toast.type = mergedConfig['icon-class'];

                            id++;
                            angular.extend(toast, { id: id });

                            if (mergedConfig['time-out'] > 0)
                                setTimeout(toast, mergedConfig['time-out']);

                            if (mergedConfig['newest-on-top'] === true)
                                scope.toasters.unshift(toast);
                            else
                                scope.toasters.push(toast);
                        }

                        function setTimeout(toast, time){
                            toast.timeout= $timeout(function (){
                                scope.removeToast(toast.id);
                            }, time);
                        }

                        scope.toasters = [];
                        scope.$on('toaster-newToast', function () {
                            addToast(toaster.toast);
                        });
                    },
                    controller: function($scope, $element, $attrs) {

                        $scope.stopTimer = function(toast){
                            if(toast.timeout)
                                $timeout.cancel(toast.timeout);
                        };

                        $scope.removeToast = function (id){
                            var i = 0;
                            for (i; i < $scope.toasters.length; i++){
                                if($scope.toasters[i].id === id)
                                    break;
                            }
                            $scope.toasters.splice(i, 1);
                        };

                        $scope.remove = function(id){
                            if ($scope.config.tap === true){
                                $scope.removeToast(id);
                            }
                        };
                    },
                    template:
                    '<div  id="toast-container" ng-class="config.position">' +
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
    .directive('cndNavigationsLeft', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/left/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            navButton: {},

            scope: {
                ngNavButton: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.navButton = JSON.parse($scope.ngNavButton);
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
    .directive('cndNavigationsRight', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/right/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            navButton: {},

            scope: {
                ngNavButton: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.navButton = JSON.parse($scope.ngNavButton);

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
    .directive('cndNavigationsLeftHome', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/left_home/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            navButton: {},

            scope: {
                ngNavButton: "@",
                ngHeaderImage: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.navButton = JSON.parse($scope.ngNavButton);
                $scope.headerImage = $scope.ngHeaderImage;
                $log.debug('Start left home nav: ' +$scope.headerImage);
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
    .directive('cndNavigationsRightTop', function factory($log, $location, $window) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/navigation/right/index_top.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            navButton: {},

            scope: {
                ngNavButton: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.navButton = JSON.parse($scope.ngNavButton);

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

    .directive('cndWidgetsSwitchGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/switch_gira/index.html',
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
    .directive('cndWidgetsSwitchHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/switch_hm/index.html',
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

    .directive('cndWidgetsDimmerGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/dimmer_gira/index.html',
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
    .directive('cndWidgetsDimmerHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/dimmer_hm/index.html',
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

    .directive('cndWidgetsWindowGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/window_gira/index.html',
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
    .directive('cndWidgetsWindowHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/window_hm/index.html',
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

    .directive('cndWidgetsBlindGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/blind_gira/index.html',
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
    .directive('cndWidgetsBlindHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/blind_hm/index.html',
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

    .directive('cndWidgetsLightGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/light_gira/index.html',
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
    .directive('cndWidgetsLightHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/light_hm/index.html',
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

    .directive('cndWidgetsHeatingGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/heating_gira/index.html',
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
    .directive('cndWidgetsHeatingHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/heating_hm/index.html',
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

    .directive('cndWidgetsMotionGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/motion_gira/index.html',
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
    .directive('cndWidgetsMotionHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/motion_hm/index.html',
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

    .directive('cndWidgetsSmokeGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/smoke_gira/index.html',
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
    .directive('cndWidgetsSmokeHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/smoke_hm/index.html',
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

    .directive('cndWidgetsWaterGira', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/water_gira/index.html',
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
    .directive('cndWidgetsWaterHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/water_hm/index.html',
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

    .directive('cndWidgetsEnergyHm', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/energy_hm/index.html',
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
    .directive('cndWidgetsCamera', function factory($log, Lightbox) {
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
                    $scope.items = [];
                    var values = presets.Value.split(',');
                    angular.forEach(values, function (value) {
                        $scope.items.push({
                            preset: value,
                            name: imageName
                        });

                    });
                    Lightbox.value = '';
                    Lightbox.presets = values;

                    $log.debug($scope.items);
                    $log.debug(imageSrc);
                    Lightbox.SetPreset = function (name, preset) {
                        alert(preset);

                    };
                    Lightbox.openModal($scope.images, 0);

                };
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
    .directive('cndWidgetsContact', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/contact/index.html',
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
    .directive('cndWidgetsSensor', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/sensor/index.html',
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
    .directive('cndWidgetsActor', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/actor/index.html',
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
    .directive('cndWidgetsThermostat', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/heating_hm/index.html',
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
    .directive('cndWidgetsAircon', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/aircon/index.html',
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
    .directive('cndWidgetsPush', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/push/index.html',
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

    .directive('cndWidgetsFavoriten', function factory($log, FavoritenService) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/favoriten/index.html',
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

                $scope.setFavorite = function (favorit) {
                    $log.debug('like = ' + favorit.Attributes.like);
                    FavoritenService.addFavorite(favorit);
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
    .directive('cndWidgetsDefault', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/widgets/default/index.html',
            replace: true,
            transclude: true,
            restrict: 'A',
            model: {},

            scope: {
                ngKind: "@"
            },

            link: function ($scope, element, attrs) {
                $scope.model = JSON.parse($scope.ngKind);
                $log.debug($scope.model);
            }
        };

        return directiveDefinitionObject;
    })

;