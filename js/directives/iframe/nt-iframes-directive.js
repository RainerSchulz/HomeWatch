/**
 * Created by RSC on 16.01.2016.
 */
angular.module('myApp')
    .directive('cndiFrame', function factory($log) {
        var directiveDefinitionObject = {
            templateUrl: 'templates/iframe/index.html',
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
    });