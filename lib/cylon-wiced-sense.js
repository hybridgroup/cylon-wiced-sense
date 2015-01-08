/*
 * cylon-wiced-sense
 * http://cylonjs.com
 *
 * Copyright (c) 2014 Your Name Here
 * Your License Here
*/

"use strict";

var Driver = require("./driver");

module.exports = {
  drivers: ["wiced-sense"],

  driver: function(opts) {
    return new Driver(opts);
  }
};
