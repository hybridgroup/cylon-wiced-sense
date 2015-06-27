"use strict";

var Driver = require("./lib/driver");

module.exports = {
  drivers: ["wiced-sense"],

  driver: function(opts) {
    return new Driver(opts);
  }
};
