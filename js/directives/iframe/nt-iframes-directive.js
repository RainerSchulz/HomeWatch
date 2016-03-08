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