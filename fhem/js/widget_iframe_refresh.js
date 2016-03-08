

window.onload = function(){
setInterval(function(){
    parent.frames['idFrame'].location.href = "http://login.homewatch-smarthome.de:8135/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=admin&pwd=HOm3W4Tch01&";
     parent.frames['idFrame2'].location.href = "http://login.homewatch-smarthome.de:8135/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=admin&pwd=HOm3W4Tch01&";
      parent.frames['idFrame3'].location.href = "http://login.homewatch-smarthome.de:8135/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=admin&pwd=HOm3W4Tch01&";
       parent.frames['idFrame4'].location.href = "http://login.homewatch-smarthome.de:8135/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=admin&pwd=HOm3W4Tch01&";
       

},3000);}
