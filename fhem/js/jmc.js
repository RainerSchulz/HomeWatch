var DEBUG = true;
var TOAST = true;
var deviceStates={};
var readings = {"STATE":true};
var devices = {};
var pars=Array();
var devs=Array();
var styleCollection={};
this.shortpollInterval = 30 * 1000; // 30 seconds
var timer;
this.doLongPoll = false;

$(function() {
  loadStyleSchema();

  // refresh every x secs
    startPollInterval();
});

var plugins = {
  modules: [],
  addModule: function (module) {
    this.modules.push(module);
  },
  load: function (name) {
    loadplugin(name, function () { 
        DEBUG && console.log('Loaded plugin: '+ name);
        var module = eval(name);
        plugins.addModule(module);
        module.init();
        
        //update all what we have until now
        for (var reading in readings) {
            for (var device in devices) {
                module.update(device,reading);
            }
        }
        //request missing readings
        // for (var reading in readings) {
        //     if (pars.indexOf(reading)<0){
        //         pars.push(reading);
        //         requestFhem(reading);
        //     }
        // }

    },null,true);
  },
  update: function (dev,par) {  
    $.each(this.modules, function (index, module) {
      //Iterate each module and run update function
      module.update(dev,par);
    });
    DEBUG && console.log('update done for device:'+dev+' parameter:'+par);
  }
};

function loadplugin(plugin, success, error, async) {
    return dynamicload('js/'+plugin+'.js', success, error, async);
}

function dynamicload(file, success, error, async) {
    var cache = (DEBUG) ? false : true;
    //var dir = $('script[src$="fhem-tablet-ui.js"]').attr('src');
    var dir = "fhem/js/fhem-tablet-ui.js";
    var name = dir.split('/').pop(); 
    dir = dir.replace('/'+name,"");
    $.ajax({
        url: dir + '/../' + file,
        dataType: "script",
        cache: cache,
        async: async || false,
        context:{name: name},
        success: success||function(){ return true },
        error: error||function(){ return false },
    });
}

this.getStyle = function (selector, prop) {
    var props = styleCollection[selector];
    return ( props && props[prop] ) ? props[prop] : null;
};

this.loadStyleSchema = function(){
    $.each($('link[href$="-ui.css"]') , function (index, thisSheet) {
        var rules = thisSheet.sheet.cssRules;
        for (var r in rules){
            if (rules[r].style){
               var styles = rules[r].style.cssText.split(';');
               styles.pop();
               var elmName = rules[r].selectorText;
               var params = {};
               for (var s in styles){
                   var param = styles[s].split(':');
                   if (param[0].match(/color/)){
                      params[$.trim(param[0])]=$.trim(param[1]);
                   }
               }
               if (Object.keys(params).length>0)
                    styleCollection[elmName]=params;
            }
        }
    });
};

this.getDeviceValue = function (device, src) {
    var param = getParameter(device, src);
    return ( param ) ? param.val : null;
};

this.getParameter = function (device, src) {
    var devname = device.data('device');
    var paraname =  (src && src != '') ? device.data(src) : Object.keys(readings)[0];
    if (devname && devname.length>0){
        var params = deviceStates[devname];
        return ( params && params[paraname] ) ? params[paraname] : null;
    }
    return null;
};

this.getPart = function (s,p) {
    if ($.isNumeric(p)){
        var c = (s && typeof s != "undefined") ? s.split(" ") : '';
        return (c.length >= p && p>0 ) ? c[p-1] : s;
    }
    else {
        if ((s && typeof s != "undefined") )
            var matches = s.match( new RegExp('^' + p + '$') );
        var ret='';
        if (matches) {
            for (var i=1;i<matches.length;i++) {
                ret+=matches[i];
            }
        }
        return ret;
    }
};

function initReadingsArray(get) {
    if(! $.isArray(get)) {
        get = new Array(get);
    }
    for(var g=0; g<get.length; g++) {
        reading = get[g];
        // fully qualified readings => DEVICE:READING
        if(reading.match(/:/)) {
            var fqreading = reading.split(':');
            var device = fqreading[0];
            if(!devices[device]){
                devices[device] = true;
                devs.push(device);
            }
            reading = fqreading[1];
        }
        if(!readings[reading]){
            readings[reading] = true;
            pars.push(reading);
        }
    }
}

function requestFhem(paraname, devicename) {
    var devicelist;
    
    // paraname = DEVICE:READING; devicename is ignored
    if(paraname.match(/:/)) {
        var temp = paraname.split(':');
        devicename = temp[0];
        paraname = temp[1];
    }
    
    if(typeof devicename != 'undefined') {
        devicelist = devicename;
    } else {
        devicelist = $.map(devs, $.trim).join();
    }
    
/* 'list' is still the fastest cmd to get all important data
*/
    $.ajax({
        async: true,
        timeout: 15000,
        cache: false,
        context:{paraname: paraname},
        url: $("meta[name='fhemweb_url']").attr("content") || "/fhem/",
        data: {
            cmd: "list " + devicelist + " " + paraname,
            XHR: "1"
        }
    })
    .fail (function(jqXHR, textStatus, errorThrown) {
            $.toast("Error: " + textStatus + ": " + errorThrown);
    })
    .done (function( data ) {
            var lines = data.replace(/\n\)/g,")\n").split(/\n/);
            var regCapture = /^(\S*)\s*([0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-2][0-9]:[0-5][0-9]:[0-5][0-9])?\.?[0-9]{0,3}\s+(.*)$/;
            for (var i=0; i < lines.length; i++) {
                var date,key,val;
                var line = $.trim( lines[i] );
                //console.log('line: '+line);
                if (regCapture.test(line) ) {
                    var groups = line.match( regCapture );
                    var paraname = this.paraname;
                    key = $.trim( line.match( regCapture )[1]);
                    if (groups.length>2){
                        date = $.trim( groups[2]);
                        val = $.trim( groups[3]);
                    }
                    //console.log('paraname',paraname,'date:',date,'val',val);
                    var params = deviceStates[key] || {};
                    var value = {"date": date, "val": val};
                    params[paraname]=value;
                    if (key in devices){
                        deviceStates[key]=params;
                        plugins.update(key,paraname);
                    }
                }
            }
    });

}

this.startPollInterval = function() {
     clearInterval(timer);
     timer = setInterval(function () {
        //get current values of readings every x seconds
        for (var reading in readings) {
            requestFhem(reading);
        }
     }, shortpollInterval); 
 };

function setFhemStatus(cmdline) {
    startPollInterval();
    DEBUG && console.log('send to FHEM: '+cmdline);
    $.ajax({
        async: true,
        url: $("meta[name='fhemweb_url']").attr("content") || "/fhem/",
        data: {
            cmd: cmdline,
            XHR: "1"
        }
    })
    .fail (function(jqXHR, textStatus, errorThrown) {
            $.toast("Error: " + textStatus + ": " + errorThrown);
    })
    .done ( function( data ) {
        if ( !doLongPoll ){
            setTimeout(function(){
                for (var reading in readings) {
                    requestFhem(reading);
                }
            }, 4000);
        }
    });
}

function initWidget(element, deviceName) {
    var div = $(element).find('[data-type]');
    var device = "none";
    if(deviceName == null) {
        device = div.data("device");
    } else {
        device = deviceName;
    }
    //var device = div.data("device");
    //var device = deviceName;
    if(!devices[device]){
        devices[device] = true;
        devs.push(device);
    }

    //var get = div.data("get");
    //initReadingsArray(get);

    $(element).find('[data-get]').each(function(index){
        initReadingsArray($(this).data("get"));
    });

    var widget_type = div.data("type");
    plugins.load('widget_'+widget_type);

    // for (var reading in readings) {
    //     requestFhem(reading);
    // }
}