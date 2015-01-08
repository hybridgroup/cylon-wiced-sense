"use strict";

var WICEDSense = source("driver");

describe("Cylon.Drivers.WICEDSense", function() {
  var driver = new WICEDSense({
    adaptor: {}
  });

  it("needs tests", function() {
    expect(driver).to.be.an.instanceOf(WICEDSense);
  });
});
