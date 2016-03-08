/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('FavoritenService', function ($http, notification, $log, $q, HomeService) {
    {
        var selected_index = -1;
        var tbFavoriten = localStorage.getItem("tbFavoriten");
        tbFavoriten = JSON.parse(tbFavoriten);
        if (tbFavoriten == null)
            tbFavoriten = [];
        return {

            addFavorite: function (favorit) {
                if (favorit.Attributes.like == 'yes') {
                    HomeService.setFavorit(favorit.Name, 'no');
                    $log.debug("Favorit gelöscht");
                    tbFavoriten.splice(selected_index, 1);
                    localStorage.setItem("tbFavoriten", JSON.stringify(tbFavoriten));
                    favorit.Attributes.like = 'yes';
                }
                else {
                    HomeService.setFavorit(favorit.Name, 'yes');
                    tbFavoriten.push(favorit);
                    localStorage.setItem("tbFavoriten", JSON.stringify(tbFavoriten));
                    $log.debug("Favorit gespeichert");
                    favorit.Attributes.like = 'no';
                }

                $log.debug(favorit);
            }

        }
    }
});
