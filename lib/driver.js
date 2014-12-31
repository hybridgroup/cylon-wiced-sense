/*
 * cylon-ble WICED sense driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var WICEDService = '739298b687b64984a5dcbdc18b068985',
    WICEDCharacteristic = '33ef91133b55413eb553fea1eaada459',
    BIT_ACCELEROMETER = 1,
    BIT_GYROSCOPE = 2,
    BIT_HUMIDITY = 4,
    BIT_MAGNETOMETER = 8,
    BIT_PRESSURE = 16,
    BIT_TEMPERATURE = 32;

var WICEDSense = module.exports = function WICEDSense(opts) {
  WICEDSense.__super__.constructor.apply(this, arguments);

  this.serviceId = opts.serviceId || WICEDService;

  this.commands = {
    getData: this.getData
  };
};

Cylon.Utils.subclass(WICEDSense, Cylon.Driver);

/**
 * Starts the driver
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 */
WICEDSense.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the driver
 *
 * @param {Function} callback to be triggered when halted
 * @return {null}
 */
WICEDSense.prototype.halt = function(callback) {
  callback();
};

/**
 * Gets data from the WICED Sense device.
 *
 * This includes the following sensor data:
 *
 * - temperature
 * - pressure
 * - magnetometer
 * - humidity
 * - gyroscope
 * - accelerometer
 *
 * @param {Function} callback to be triggered when data is retrieved
 * @return {null}
 * @publish
 */
WICEDSense.prototype.getData = function(callback) {
  var self = this;
  self.connection.notifyServiceCharacteristic(self.serviceId, WICEDCharacteristic, true,
    function(err, data) {
      if (data !== null) {
        data = self._parseData(data);
      }

      callback(err, data);
    }
  );
};

WICEDSense.prototype._parseData = function(data) {
  var bitMask = data[0],
      result = {}, pos = 1,
      x, y, z;

  if (bitMask & BIT_ACCELEROMETER) {
    x = data.readInt16LE(pos);
    pos += 2;
    y = data.readInt16LE(pos);
    pos += 2;
    z = data.readInt16LE(pos);
    pos += 2;

    result['accelerometer'] = {x: x, y: y, z: z};
  }

  if (bitMask & BIT_GYROSCOPE) {
    x = data.readInt16LE(pos);
    pos += 2;
    y = data.readInt16LE(pos);
    pos += 2;
    z = data.readInt16LE(pos);
    pos += 2;

    result['gyroscope'] = {x: x, y: y, z: z};
  }

  if (bitMask & BIT_HUMIDITY) {
    var humidity = data.readInt16LE(pos);
    pos += 2;

    result['humidity'] = humidity;
  }

  if (bitMask & BIT_MAGNETOMETER) {
    x = data.readInt16LE(pos);
    pos += 2;
    y = data.readInt16LE(pos);
    pos += 2;
    z = data.readInt16LE(pos);
    pos += 2;

    result['magnetometer'] = {x: x, y: y, z: z};
  }

  if (bitMask & BIT_PRESSURE) {
    var pressure = data.readInt16LE(pos);
    pos += 2;

    result['pressure'] = pressure;
  }

  if (bitMask & BIT_TEMPERATURE) {
    var temperature = data.readInt16LE(pos);
    pos += 2;

    result['temperature'] = temperature;
  }

  return result;
};

WICEDSense.prototype._getServiceCharacteristic = function(characteristicId, callback) {
  this.connection.readServiceCharacteristic(this.serviceId, characteristicId, callback);
};
