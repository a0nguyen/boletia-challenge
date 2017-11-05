'use strict';

var expect = require('chai').expect;
require('../boletia-challenge.calculate-comission-and-total.js')()

describe('#CalculateComissionAndTotal', function () {

    var defaultComissions = { card: { fixed: 5, percent: 3.5 }, deposit: { fixed: 2, percent: 2.5 } }
    var event = {}
    var user = {}
    var transaction = { price: 100, quantity: 2 }
    var boletiaFixed = 5
    describe("when there are comission by event", function () {
        beforeEach(
            function () {
                event.comissions = {
                    card: { fixed: 5, percent: 2.5 }
                }
                user = {}
            }
        );

        describe("when there is only one comission", function () {
            describe("when select method is matching event comission", function () {
                it('should return comission and total price according to calcul and event com', function () {
                    var result = new CalculateComissionAndTotal(user, event, defaultComissions, "card", transaction, boletiaFixed).call();
                    expect(result.total_comission).to.equal(20);
                    expect(result.total_price).to.equal(220);
                });
            })
            describe("when select method is not matching event comission", function () {
                it('should return comission and total price according to calcul and default com', function () {
                    console.log("user: ", user)
                    var result = new CalculateComissionAndTotal(user, event, defaultComissions, "deposit", transaction, boletiaFixed).call();
                    expect(result.total_comission).to.equal(14);
                    expect(result.total_price).to.equal(214);
                });
            })
        })
        describe("when there are two comission", function () {
            beforeEach(
                function () {
                    event.comissions = { card: { fixed: 5, percent: 2.5 }, deposit: { fixed: 4, percent: 2.5 } }
                    user = {}
                }
            );
            describe("when select method is matching event comission card", function () {
                it('should return comission and total price according to calcul and event card com', function () {
                    var result = new CalculateComissionAndTotal(user, event, defaultComissions, "card", transaction, boletiaFixed).call();
                    expect(result.total_comission).to.equal(20);
                    expect(result.total_price).to.equal(220);
                });
            })
            describe("when select method is matching event comission deposit", function () {
                it('should return comission and total price according to calcul and event dep com', function () {
                    var result = new CalculateComissionAndTotal(user, event, defaultComissions, "deposit", transaction, boletiaFixed).call();
                    expect(result.total_comission).to.equal(18);
                    expect(result.total_price).to.equal(218);
                });
            })
        })
    })
    describe("when there are comission by user", function () {
        beforeEach(
            function () {
                user.comissions = { card: { fixed: 5, percent: 2.5 } }
                event = {}
            }
        );
        describe("when select method is matching user comission", function () {
            it('should return comission and total price according to calcul and user com', function () {
                var result = new CalculateComissionAndTotal(user, event, defaultComissions, "card", transaction, boletiaFixed).call();
                expect(result.total_comission).to.equal(20);
                expect(result.total_price).to.equal(220);
            });
        })
        describe("when select method is not matching user comission", function () {
            it('should return comission and total price according to calcul and default com', function () {
                var result = new CalculateComissionAndTotal(user, event, defaultComissions, "deposit", transaction, boletiaFixed).call();
                expect(result.total_comission).to.equal(14);
                expect(result.total_price).to.equal(214);
            });
        })
        describe("when there are comission by event matching payment method", function () {
            beforeEach(
                function () {
                    user.comissions = { card: { fixed: 5, percent: 2.5 } }
                    event.comissions = { card: { fixed: 5, percent: 1.5 } }
                }
            );
            it('should return comission and total price according to calcul and event com', function () {
                var result = new CalculateComissionAndTotal(user, event, defaultComissions, "card", transaction, boletiaFixed).call();
                expect(result.total_comission).to.equal(18);
                expect(result.total_price).to.equal(218);
            });
        })
        describe("when there are comission by event not matching payment method", function () {
            beforeEach(
                function () {
                    user.comissions = { deposit: { fixed: 2, percent: 2 } }
                    event.comissions = { card: { fixed: 5, percent: 1.5 } }
                }
            );
            describe("when select method is matching user comission", function () {
                it('should return comission and total price according to calcul and default com', function () {
                    var result = new CalculateComissionAndTotal(user, event, defaultComissions, "deposit", transaction, boletiaFixed).call();
                    expect(result.total_comission).to.equal(13);
                    expect(result.total_price).to.equal(213);
                });
            })
        })
    })
    describe("when there are no comission by event or user", function () {
        beforeEach(
            function () {
                event = { }
                user = {}
            }
        );
        it('should return comission and total price according to calcul', function () {
            var result = new CalculateComissionAndTotal(user, event, defaultComissions, "card", transaction, boletiaFixed).call();
            expect(result.total_comission).to.equal(22);
            expect(result.total_price).to.equal(222);
        });
    })
});