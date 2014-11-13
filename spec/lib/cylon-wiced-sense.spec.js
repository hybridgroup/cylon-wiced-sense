"use strict";

var module = source("cylon-wiced-sense");

var WICEDSense = source('driver');

describe("Cylon.WicedSense", function() {
  describe("#drivers", function() {
    it('is an array of supplied drivers', function() {
      expect(module.drivers).to.be.eql(['wiced-sense']);
    });
  });

  describe("#driver", function() {
    it("returns an instance of the WICEDSense", function() {
      var args = { adaptor: {} };
      expect(module.driver(args)).to.be.instanceOf(WICEDSense);
    });
  });
});
