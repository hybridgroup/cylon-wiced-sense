// jshint expr:true
"use strict";

var Cylon = require("cylon");

var WICEDSense = source("driver");

describe("Cylon.Drivers.WICEDSense", function() {
  var driver;

  beforeEach(function() {
    driver = new WICEDSense({
      connection: {}
    });
  });

  it("is an instance of Cylon.Driver", function() {
    expect(driver).to.be.an.instanceOf(WICEDSense);
    expect(driver).to.be.an.instanceOf(Cylon.Driver);
  });

  describe("constructor", function() {
    it("sets @commands", function() {
      expect(driver.commands).to.be.an("object");
      expect(driver.commands).to.be.eql({
        getData: driver.getData
      });
    });

    context("if serviceId is provided", function() {
      beforeEach(function() {
        driver = new WICEDSense({
          adaptor: {},
          serviceId: "serviceId"
        });
      });

      it("sets @serviceId to the provided value", function() {
        expect(driver.serviceId).to.be.eql("serviceId");
      });
    });

    describe("by default", function() {
      it("sets @serviceId to WICEDService", function() {
        expect(driver.serviceId).to.be.eql("739298b687b64984a5dcbdc18b068985");
      });
    });
  });

  describe("#start", function() {
    var callback;

    beforeEach(function() {
      callback = spy();
      driver.start(callback);
    });

    it("triggers the provided callback", function() {
      expect(callback).to.be.called;
    });
  });

  describe("#halt", function() {
    var callback;

    beforeEach(function() {
      callback = spy();
      driver.halt(callback);
    });

    it("triggers the provided callback", function() {
      expect(callback).to.be.called;
    });
  });

  describe("#getData", function() {
    var notify, callback;

    beforeEach(function() {
      callback = spy();
      notify = driver.connection.notifyServiceCharacteristic = stub();

      driver._parseData = stub().returns({ parsedData: true });

      driver.getData(callback);
    });

    it("calls @connection.notifyServiceCharacteristic", function() {
      expect(notify).to.be.calledWith(
        driver.serviceId,
        "33ef91133b55413eb553fea1eaada459"
      );
    });

    describe("when the BLE connection returns data", function() {
      context("if the data is null", function() {
        beforeEach(function() {
          notify.yield(null, null);
        });

        it("triggers the callback with null", function() {
          expect(callback).to.be.calledWith(null, null);
        });

        it("doesn't try to process the data", function() {
          expect(driver._parseData).to.not.be.called;
        });
      });

      context("if an error occurs", function() {
        beforeEach(function() {
          notify.yield("error", null);
        });

        it("triggers the callback with the error", function() {
          expect(callback).to.be.calledWith("error", null);
        });
      });

      context("if data is provided", function() {
        beforeEach(function() {
          notify.yield(null, { data: true });
        });

        it("parses the data", function() {
          expect(driver._parseData).to.be.calledWith({ data: true });
        });

        it("triggers the callback with the parsed data", function() {
          expect(callback).to.be.calledWith(null, { parsedData: true });
        });
      });
    });
  });
});
