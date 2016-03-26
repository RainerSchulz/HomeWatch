/**
 * Created by Rainer on 01.03.2016.
 */
myApp.service('MetaService', function() {
    var title = 'fhemweb_url';
    var metaDescription = 'http:///login.homewatch-smarthome.de:8139/fhem';
    var metaKeywords = 'fhemweb_url';
    return {
        set: function(newTitle, newMetaDescription, newKeywords) {
            metaKeywords = newKeywords;
            metaDescription = newMetaDescription;
            title = newTitle;
        },
        metaTitle: function(){ return title; },
        metaDescription: function() { return metaDescription; },
        metaKeywords: function() { return metaKeywords; }
    }
});