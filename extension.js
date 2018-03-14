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

    ext.is3dRudderConnected = function(port) {
        if (SDK)
            return SDK.controllers[port].connected;
        return false;
      };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['b', '3dRudder %n is Connected', 'is3dRudderConnected', 0]
            /*['r', '3dRudder_Version', '3dRudder_Version'],
            ['r', '3dRudder_Status_Code', '3dRudder_Status_Code'],
            ['r', '3dRudder_Status', '3dRudder_Status'],
            ['r', '3dRudder_Axis_AX', '3dRudder_Axis_AX'],
            ['r', '3dRudder_Axis_AY', '3dRudder_Axis_AY'],
            ['r', '3dRudder_Axis_AZ', '3dRudder_Axis_AZ'],
            ['r', '3dRudder_Axis_RZ', '3dRudder_Axis_RZ'],
            ['', '3dRudder_PlaySnd( %s,%b )', '3dRudder_PlaySnd', '', false]*/
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