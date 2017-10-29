'use strict';

var expect = require('chai').expect;
require('../boletia-challenge.calculate-comission-and-total.js')()

describe('#CalculateComissionAndTotal', function () {

    var cardPaymentMethod = { name: "card", comission: "0.035", type: "percent" }
    var depositPaymentMethod = { name: "deposit", comission: 10, type: "uint" }
    var eventComissions = [{ paymentMethod: cardPaymentMethod, comission: 0.04 }]

    describe("when there are comission by event", function () {
        describe("when select method is matching event comission", function () {
            it('should return comission = event comission for payment method * quantity and total = event comission for payment method * quantity', function () {
                var result = new CalculateComissionAndTotal(eventComissions, [cardPaymentMethod, depositPaymentMethod], "card", 2, 100).call();
                expect(result.total_comission).to.equal(8);
                expect(result.total_price).to.equal(208);
            });
        })
        describe("when select method is not matching event comission", function () {
            it('should return comission = payment method comission * quantity and total = event comission for payment method comission * quantity', function () {
                var result = new CalculateComissionAndTotal(eventComissions, [cardPaymentMethod, depositPaymentMethod], "deposit", 2, 100).call()
                expect(result.total_comission).to.equal(20);
                expect(result.total_price).to.equal(220);
            });
        })
    })
    describe("when there are no comission by event", function () {
        it('should return comission = payment method comission * quantity and total = event comission for payment method comission * quantity', function () {
            var result = new CalculateComissionAndTotal([], [cardPaymentMethod, depositPaymentMethod], "card", 2, 100).call()
            expect(result.total_comission).to.equal(7);
            expect(result.total_price).to.equal(207);
        });
    })
});