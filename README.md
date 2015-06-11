# Cylon.js For WICED Sense

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and
physical computing using Node.js

This repository contains the Cylon driver for the Broadcom WICED Sense Bluetooth LE development kit [http://www.broadcom.com/products/wiced/sense/](http://www.broadcom.com/products/wiced/sense/).

For more information about Cylon, check out the repo at
https://github.com/hybridgroup/cylon

## How to Install

To connect to the WICED Sense with Cylon, you'll need to install the `cylon-wiced-sense` NPM module.
You will also need to bundle in `cylon-ble`, which is needed to communicate with the device.

    $ npm install cylon cylon-ble cylon-wiced-sense

## How to Use

Here's a short example of getting data from the WICED Sense with Cylon:

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'ble', uuid: '207377654321' }
  },

  devices: {
    wiced: { driver: 'wiced-sense' }
  },

  work: function(my) {
    my.wiced.getData(function(err, data) {
      if (!!err) {
        console.log("Error: ", err);
        return;
      }

      console.log("Data: ", data);
    });
  }
}).start();
```

## How to Connect

The WICED Sense is a Bluetooth Low-Energy device, and is paired and connected as with any other BLE device. As long as you have the needed hardware in your computer for Bluetooth LE (Bluetooth 4.0), you can connect to the WICED Sense.

For more info, check out the [BLE platform page](http://cylonjs.com/documentation/platforms/ble).

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-wiced-sense/blob/master/RELEASES.md](https://github.com/hybridgroup/cylon-wiced-sense/blob/master/RELEASES.md).

## License

Copyright (c) 2014 The Hybrid Group. Licensed under the Apache 2.0 license.
