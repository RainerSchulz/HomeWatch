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
;