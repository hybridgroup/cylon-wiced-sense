"use strict";

var noble = require("noble");
var Cylon = require("cylon");

//wait for noble to power on 
//this is necessary for Ubuntu system but not OSX
noble.on('stateChange', function(state) {
  if (state == 'poweredOn'){
    Cylon.robot({
      connections: {
        bluetooth: { adaptor: "ble", uuid: "207377654321" }
      },

      devices: {
        battery: { driver: "ble-battery-service" },
        deviceInfo: { driver: "ble-device-information" },
        generic: { driver: "ble-generic-access" },
        wiced: { driver: "wiced-sense" }
      },

      display: function(err, data) {
        if (err) {
          console.log("error:", err);
          return;
        }

        console.log("data:", data);
      },

      work: function(my) {
        my.generic.getDeviceName(function(err, data) {
          my.display(err, data);

          my.generic.getAppearance(function(err, data) {
            my.display(err, data);

            my.deviceInfo.getManufacturerName(function(err, data) {
              my.display(err, data);

              my.wiced.getData(function(err, data) {
                my.display(err, data);
              });
            });
          });
        });
      }
    }).start();
  }
}
