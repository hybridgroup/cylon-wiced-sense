/*
 * cylon-wiced-sense
 * http://cylonjs.com
 *
 * Copyright (c) 2014 Your Name Here
 * Your License Here
*/

'use strict';

var Cylon = require('cylon');

var Driver = require('./driver');

module.exports = {
  driver: function(opts) {
    return new Driver(opts);
  },

  register: function(robot) {
    robot.registerDriver('cylon-wiced-sense', 'wiced-sense');
  }
};
