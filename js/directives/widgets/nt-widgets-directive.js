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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },
            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
                }
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

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
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
            model: {},

            scope: {
                ngKind: "@"
            },

            link: {
                pre: function preLink($scope, element, attrs, controller) {
                    $scope.model = JSON.parse($scope.ngKind);
                },
                post: function postLink($scope, element, attrs, controller) {
                    initWidget(element, $scope.model.Name);
                }
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