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