/**
 * Created by RSC on 18.01.2016.
 */

myApp.service('FavoritenService', function ($http, notification, $log, $q, HomeWatchService) {
    {
        var selected_index = -1;
        var tbFavoriten = localStorage.getItem("tbFavoriten");
        tbFavoriten = JSON.parse(tbFavoriten);
        if (tbFavoriten == null)
            tbFavoriten = [];
        return {

            addFavorite: function (name, like) {
                var favorit = {
                    Name: name,
                    Like: like
                };
                $log.debug(favorit);
                if (like == 'yes') {
                    HomeService.setFavorit(name, 'no');
                    $log.debug("Favorit gelöscht");
                    tbFavoriten.splice(selected_index, 1);
                    localStorage.setItem("tbFavoriten", JSON.stringify(tbFavoriten));
                    like = 'yes';
                }
                else {
                    HomeService.setFavorit(name, 'yes');
                    tbFavoriten.push(favorit);
                    localStorage.setItem("tbFavoriten", JSON.stringify(tbFavoriten));
                    $log.debug("Favorit gespeichert");
                    like = 'no';
                }


            }

        }
    }
});
