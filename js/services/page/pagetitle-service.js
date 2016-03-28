/**
 * Created by B026789 on 12.01.2016.
 */
myApp.service('Page', function ($rootScope, connection) {
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
            var metaData = $rootScope.MetaDataContent;
            if (angular.isUndefined(metaData)) {
                metaData = connection.fhemweb_url;
            }
            return metaData;
        }


    }
});