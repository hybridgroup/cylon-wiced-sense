"use strict";

var module = source("cylon-wiced-sense");

var WICEDSense = source('driver');

describe("Cylon.WicedSense", function() {
  describe("#register", function() {
    it("should be a function", function() {
      expect(module.register).to.be.a('function');
    });
  });

  describe("#driver", function() {
    it("returns an instance of the WICEDSense", function() {
      var args = { device: {connection: 'test'} };
      expect(module.driver(args)).to.be.instanceOf(WICEDSense);
    });
  });
});
