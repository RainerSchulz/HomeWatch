



$(document).ready(function() {
   setInterval('reloadImages()', 3000); // 3 seconds
});
function reloadImages()
{
  $('#imagen5').attr('src', 'http://login.homewatch-smarthome.de:8135/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=admin&pwd=HOm3W4Tch01&' + Math.random());

  $('#imagen6').attr('src', 'http://login.homewatch-smarthome.de:8135/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=admin&pwd=HOm3W4Tch01&' + Math.random());

    $('#imagen7').attr('src', 'http://login.homewatch-smarthome.de:8135/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=admin&pwd=HOm3W4Tch01&' + Math.random());


     $('#imagen8').attr('src', 'http://login.homewatch-smarthome.de:8135/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=admin&pwd=HOm3W4Tch01&' + Math.random());/*/*


     $('#imagen4').attr('src', 'http://login.homewatch-smarthome.de:8135/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=admin&pwd=HOm3W4Tch01&' + Math.random());*/
 
}