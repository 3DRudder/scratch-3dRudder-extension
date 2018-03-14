(function(ext) {
   
    var SDK = null;
    function load3dRudderjs() {
        $.getScript('https://3drudder.github.io/3dRudder-js/dist/3dRudder-1.0.4.js')
            .done(function(script, textStatus) {
                console.log('Loaded 3dRudder-js');
                begin();                
            })
            .fail(function(jqxhr, settings, exception) {
                console.log('Error loading 3dRudder-js');
                load3dRudderjs();
        });
    }
    function begin() {
        SDK = new Sdk3dRudder();
        SDK.init();
        SDK.on('init', function(init) {
            console.log('3dRudder initialized on Scratch X');            
        });
    }
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {
        if (SDK)
            SDK.stop();
    };

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        if(!SDK) 
            return {status: 1, msg: 'SDK not loaded'};
        else if (!SDK.controllers[0].connected)
            return {status: 1, msg: '3dRudder not connected'};
        else
            return {status: 2, msg: '3dRudder connected'};
    };

    ext.isConnected = function(port) {
        if (SDK)
            return SDK.controllers[port].connected;
        return false;
    };

    ext.getVersion = function(port) {
        if (SDK)
            return SDK.controllers[port].firmware;
        return '';
    };

    ext.getStatusCode = function(port) {
        if (SDK)
            return SDK.controllers[port].status;
        return 0;
    };

    ext.getStatus = function(port) {
        if (SDK)
            return SDK.getStatusString(SDK.controllers[port].status);
        return descriptor.menus.status[0];
    };

    ext.getX = function(port) {
        if (SDK)
            return SDK.controllers[port].axis.roll;
        return false;
    };

    ext.getY = function(port) {
        if (SDK)
            return SDK.controllers[port].axis.pitch;
        return false;
    };

    ext.getZ = function(port) {
        if (SDK)
            return SDK.controllers[port].axis.updown;
        return false;
    };

    ext.getRZ = function(port) {
        if (SDK)
            return SDK.controllers[port].axis.yaw;
        return false;
    };

    ext.playSound = function(port, tones) {
        if (SDK)
            return SDK.playSoundTones(port, tones);        
    };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['b', '3dRudder %n is Connected', 'isConnected', 0],
            ['r', '3dRudder %n Version', 'getVersion', 0],
            ['r', '3dRudder %n Status Code', 'getStatusCode', 0],
            ['r', '3dRudder %n Status', 'getStatus', 0],
            ['r', '3dRudder %n Axis X', 'getX', 0],
            ['r', '3dRudder %n Axis Y', 'getY', 0],
            ['r', '3dRudder %n Axis Z', 'getZ', 0],
            ['r', '3dRudder %n Axis RZ', 'getRZ', 0],
            ['', '3dRudder %n PlaySound( %s )', 'playSound', 0, '']
        ],
        menus: {
            error: ["Success", "Not connected", "Fail", "Incorrect command", "Timeout", "Wrong signature", "Not ready"],
            status: ["No status", "No foot stay still", "Initialisation", "Put your feet", "Put second foot", "Stay still", "In use", "Extended mode"]
        },
        url: 'https://3drudder.github.io/scratch-3dRudder-extension/',
        displayName: '3dRudder Extension 1.0'
    };

    // Register the extension
    ScratchExtensions.register('3dRudder extension', descriptor, ext);
    load3dRudderjs();
})({});