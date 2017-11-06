import { AppPage, sleepTime, mediumSleepTime, longSleepTime, path } from './app.po';
import { browser, element, by } from 'protractor';

describe('Dado que estas en el buscador de eventos', () => {
  describe('Cuando busques por id de evento', () => {
    browser.ignoreSynchronization = true
    it('Entonces debes poder agregar comisiones personalizadas por método de pago', () => {
      //go to events
      browser.get('/events')
      browser.sleep(mediumSleepTime)
      // find event
      var eventId = element(by.id("eventId"))
      eventId.sendKeys('2')
      browser.sleep(mediumSleepTime)
      //check that event is present
      expect(element(by.css('.card-content p')).getText()).toBe("concierto de j balvin")
      expect(element(by.css('.card-action'))).toBeTruthy();
      // update event comission
      var timestamp = String(new Date().getTime()).substr(-1);
      element(by.css(".card-action a")).click()
      browser.sleep(longSleepTime)
      expect(browser.getCurrentUrl()).toContain("2/comissions")
    });
  });
});

describe('Dado que estas en personalizando comisiones para un de evento', () => {
  describe('Cuando editas las comisiones de usuario', () => {
    browser.ignoreSynchronization = true
    it('Entonces debes poder agregar comisiones personalizadas por método de pago', () => {
      browser.get('/events/2/comissions')
      var timestamp = String(new Date().getTime()).substr(-1);
      browser.sleep(longSleepTime)
      var userComCardFixed = element(by.css(".e2e-user-comission-card-fixed"))
      userComCardFixed.clear()
      userComCardFixed.sendKeys(timestamp)
      var userComCardPercent = element(by.css(".e2e-user-comission-card-percent"))
      userComCardPercent.clear()
      userComCardPercent.sendKeys(2 + +timestamp)
      browser.sleep(sleepTime)
      element(by.css('app-comissions-page .btn-large')).click()
      browser.sleep(sleepTime)
      // check that user has been update
      browser.get('/events/2/comissions')
      browser.sleep(longSleepTime)
      expect(element(by.css(".e2e-user-comission-card-fixed")).getAttribute("value")).toBe(`${timestamp}`)
      expect(element(by.css(".e2e-user-comission-card-percent")).getAttribute("value")).toBe(`${2 + +timestamp}`)
      // check that user has been update
      browser.get('/events/7/comissions')
      browser.sleep(longSleepTime)
      expect(element(by.css(".e2e-user-comission-card-fixed")).getAttribute("value")).toBe(`${timestamp}`)
      expect(element(by.css(".e2e-user-comission-card-percent")).getAttribute("value")).toBe(`${2 + +timestamp}`)
    });
  });
  describe('Cuando editas las comisiones de event', () => {
    browser.ignoreSynchronization = true
    it('Entonces debes poder agregar comisiones personalizadas por método de pago', () => {
      browser.get('/events/2/comissions')
      var timestamp = String(new Date().getTime()).substr(-1);
      browser.sleep(longSleepTime)
      var eventComCardFixed = element(by.css(".e2e-event-comission-card-fixed"))
      eventComCardFixed.clear()
      eventComCardFixed.sendKeys(timestamp)
      var eventComCardPercent = element(by.css(".e2e-event-comission-card-percent"))
      eventComCardPercent.clear()
      eventComCardPercent.sendKeys(2 + +timestamp)
      browser.sleep(sleepTime)
      element(by.css('app-comissions-page .btn-large')).click()
      browser.sleep(sleepTime)
      // check that event has been update
      browser.get('/events/2/comissions')
      browser.sleep(longSleepTime)
      expect(element(by.css(".e2e-event-comission-card-fixed")).getAttribute("value")).toBe(`${timestamp}`)
      expect(element(by.css(".e2e-event-comission-card-percent")).getAttribute("value")).toBe(`${2 + +timestamp}`)
      // check that only the event has been update
      browser.get('/events/7/comissions')
      browser.sleep(longSleepTime)
      expect(element(by.css(".e2e-event-comission-card-fixed")).getAttribute("value")).not.toBe(`${timestamp}`)
      expect(element(by.css(".e2e-event-comission-card-percent")).getAttribute("value")).not.toBe(`${2 + timestamp}`)
    });
  });
});

describe('Dado que ingresas a la página de compra', () => {
  browser.ignoreSynchronization = true
  it('Entonces mostrar el formulario para ingresar el precio del boleto Y la cantidad de boletos Y seleccionar el método de pago', () => {
    browser.get('/events/2/book')
    browser.sleep(longSleepTime)
    expect(element(by.css('#price'))).toBeTruthy()
    expect(element(by.css('#paymentMehod'))).toBeTruthy()
    expect(element(by.css('#quantity'))).toBeTruthy()
  });
  describe('Cuando se hace submit', () => {
    it('monstrar el resumen', () => {
      browser.get('/events/2/book')
      browser.sleep(longSleepTime)
      element(by.css('#price')).sendKeys('200')
      element(by.css('.e2e-quantity input.select-dropdown')).click()
      browser.sleep(mediumSleepTime)
      element(by.css('.e2e-quantity  ul li:nth-child(3)')).click()
      browser.sleep(mediumSleepTime)
      element(by.css('.e2e-payment input.select-dropdown')).click()
      browser.sleep(mediumSleepTime)
      element(by.css('.e2e-payment  ul li:nth-child(3)')).click()
      browser.sleep(mediumSleepTime)
      element(by.css('app-book-page .btn-large')).click()
      browser.sleep(mediumSleepTime)
      expect(browser.getCurrentUrl()).toContain("/receipt/")
    });
  });
});

describe('Dado que ya creaste un booking, después de realizar el cálculo', () => {
  browser.ignoreSynchronization = true
  it('Entonces mostrar el resumen de compra que incluye la cantidad de boletos comprados, el precio Y el cálculo de las comisiones Y el total a pagar', () => {
    browser.get('/events/2/book')
    browser.sleep(longSleepTime)
    element(by.css('#price')).sendKeys('2')
    element(by.css('.e2e-quantity input.select-dropdown')).click()
    browser.sleep(mediumSleepTime)
    element(by.css('.e2e-quantity  ul li:nth-child(3)')).click()
    browser.sleep(mediumSleepTime)
    element(by.css('.e2e-payment input.select-dropdown')).click()
    browser.sleep(mediumSleepTime)
    element(by.css('.e2e-payment  ul li:nth-child(3)')).click()
    browser.sleep(mediumSleepTime)
    element(by.css('app-book-page .btn-large')).click()
    browser.sleep(mediumSleepTime)
    expect(element(by.css('.e2e-price'))).toBeTruthy()
    expect(element(by.css('.e2e-quantity'))).toBeTruthy()
    expect(element(by.css('.e2e-quantity'))).toBeTruthy()
    expect(element(by.css('.e2e-comission'))).toBeTruthy()
  });
});

describe('Cuando cambio las comissiones de usuario de un evento', () => {
  browser.ignoreSynchronization = true
  describe('Cuando hago un booking del evento', () => {
    describe('Cuando escojo pagar con tarjeta', () => {
      var timestamp = String(new Date().getTime()).substr(-1);
      var price = 200;
      var quantity = 2
      var timestampx2 = 2 + +timestamp
      it('Entonces hace el calculo y mostra las comisiones y el precio total cuando ', () => {
        browser.get('/events/2/comissions')
        browser.sleep(longSleepTime)
        var userComCardFixed = element(by.css(".e2e-user-comission-card-fixed"))
        userComCardFixed.clear()
        userComCardFixed.sendKeys(timestamp)
        var userComCardPercent = element(by.css(".e2e-user-comission-card-percent"))
        userComCardPercent.clear()
        userComCardPercent.sendKeys(timestampx2)
        var eventComCardFixed = element(by.css(".e2e-event-comission-card-fixed"))
        eventComCardFixed.clear()
        var eventComCardPercent = element(by.css(".e2e-event-comission-card-percent"))
        eventComCardPercent.clear()
        browser.sleep(sleepTime)
        element(by.css('app-comissions-page .btn-large')).click()
        browser.sleep(mediumSleepTime)
        //check current event
        browser.get('/events/2/book')
        browser.sleep(longSleepTime)
        element(by.css('#price')).sendKeys('200')
        element(by.css('.e2e-quantity input.select-dropdown')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-quantity  ul li:nth-child(3)')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-payment input.select-dropdown')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-payment  ul li:nth-child(2)')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('app-book-page .btn-large')).click()
        browser.sleep(longSleepTime)
        var totalPrice = quantity * (price + +timestamp + price * timestampx2 / 100) + 5
        expect(element(by.css('.e2e-total')).getText()).toBe(String(totalPrice))
        expect(element(by.css('.e2e-total-comission')).getText()).toBe(String(totalPrice - quantity * price))
        //check event with the same user
        browser.get('/events/7/book')
        browser.sleep(longSleepTime)
        element(by.css('#price')).sendKeys('200')
        element(by.css('.e2e-quantity input.select-dropdown')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-quantity  ul li:nth-child(3)')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-payment input.select-dropdown')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-payment  ul li:nth-child(2)')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('app-book-page .btn-large')).click()
        browser.sleep(longSleepTime)

        expect(element(by.css('.e2e-total')).getText()).toBe(String(totalPrice))
        expect(element(by.css('.e2e-total-comission')).getText()).toBe(String(totalPrice - quantity * price))
      });
      describe('Cuando cambio las comisiones de evento', () => {
        var timestamp = String(new Date().getTime()).substr(-1);
        var price = 200;
        var quantity = 2
        var timestampx2 = 2 + +timestamp
        it('Entonces hace el calculo y mostra las comisiones y el precio total ', () => {
          browser.get('/events/2/comissions')
          browser.sleep(longSleepTime)
          var userComCardFixed = element(by.css(".e2e-user-comission-card-fixed"))
          userComCardFixed.clear()
          userComCardFixed.sendKeys(timestamp)
          var userComCardPercent = element(by.css(".e2e-user-comission-card-percent"))
          userComCardPercent.clear()
          userComCardPercent.sendKeys(timestampx2)
          var eventComCardFixed = element(by.css(".e2e-event-comission-card-fixed"))
          eventComCardFixed.clear()
          eventComCardFixed.sendKeys(+timestamp + 1)
          var eventComCardPercent = element(by.css(".e2e-event-comission-card-percent"))
          eventComCardPercent.clear()
          eventComCardPercent.sendKeys(timestampx2 + 1)
          browser.sleep(sleepTime)
          element(by.css('app-comissions-page .btn-large')).click()
          browser.sleep(mediumSleepTime)
          //check current event
          browser.get('/events/2/book')
          browser.sleep(longSleepTime)
          element(by.css('#price')).sendKeys('200')
          element(by.css('.e2e-quantity input.select-dropdown')).click()
          browser.sleep(mediumSleepTime)
          element(by.css('.e2e-quantity  ul li:nth-child(3)')).click()
          browser.sleep(mediumSleepTime)
          element(by.css('.e2e-payment input.select-dropdown')).click()
          browser.sleep(mediumSleepTime)
          element(by.css('.e2e-payment  ul li:nth-child(2)')).click()
          browser.sleep(mediumSleepTime)
          element(by.css('app-book-page .btn-large')).click()
          browser.sleep(longSleepTime)
          var totalPrice = quantity * (price + +timestamp + 1 + price * (timestampx2 + 1) / 100) + 5
          expect(element(by.css('.e2e-total')).getText()).toBe(String(totalPrice))
          expect(element(by.css('.e2e-total-comission')).getText()).toBe(String(totalPrice - quantity * price))
          //check event with the same user
          browser.get('/events/7/book')
          browser.sleep(longSleepTime)
          element(by.css('#price')).sendKeys('200')
          element(by.css('.e2e-quantity input.select-dropdown')).click()
          browser.sleep(mediumSleepTime)
          element(by.css('.e2e-quantity  ul li:nth-child(3)')).click()
          browser.sleep(mediumSleepTime)
          element(by.css('.e2e-payment input.select-dropdown')).click()
          browser.sleep(mediumSleepTime)
          element(by.css('.e2e-payment  ul li:nth-child(2)')).click()
          browser.sleep(mediumSleepTime)
          element(by.css('app-book-page .btn-large')).click()
          browser.sleep(longSleepTime)
          var totalPrice = quantity * (price + +timestamp + price * timestampx2 / 100) + 5
          expect(element(by.css('.e2e-total')).getText()).toBe(String(totalPrice))
          expect(element(by.css('.e2e-total-comission')).getText()).toBe(String(totalPrice - quantity * price))
        });
      })
    })
    describe('Cuando escojo pagar con deposito', () => {
      var timestamp = String(new Date().getTime()).substr(-1);
      var price = 200;
      var quantity = 2
      var timestampx2 = 2 + +timestamp
      it('Entonces hace el calculo y mostra las comisiones y el precio total ', () => {
        browser.get('/events/2/comissions')
        browser.sleep(longSleepTime)
        var userComCardFixed = element(by.css(".e2e-user-comission-card-fixed"))
        userComCardFixed.clear()
        userComCardFixed.sendKeys(timestamp)
        var userComCardPercent = element(by.css(".e2e-user-comission-card-percent"))
        userComCardPercent.clear()
        userComCardPercent.sendKeys(timestampx2)
        var eventComCardFixed = element(by.css(".e2e-event-comission-card-fixed"))
        eventComCardFixed.clear()
        var eventComCardPercent = element(by.css(".e2e-event-comission-card-percent"))
        eventComCardPercent.clear()
        browser.sleep(sleepTime)
        element(by.css('app-comissions-page .btn-large')).click()
        browser.sleep(mediumSleepTime)
        //check current event
        browser.get('/events/2/book')
        browser.sleep(longSleepTime)
        element(by.css('#price')).sendKeys('200')
        element(by.css('.e2e-quantity input.select-dropdown')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-quantity  ul li:nth-child(3)')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-payment input.select-dropdown')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-payment  ul li:nth-child(3)')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('app-book-page .btn-large')).click()
        browser.sleep(longSleepTime)
        var totalPrice = quantity * (price + 2 + price * 2.5 / 100) + 5
        expect(element(by.css('.e2e-total')).getText()).toBe(String(totalPrice))
        expect(element(by.css('.e2e-total-comission')).getText()).toBe(String(totalPrice - quantity * price))
      });
    })
  })
});

describe('Cuando cambio las comissiones de un evento', () => {
  describe('Cuando escojo pagar con tarjeta', () => {
    var timestamp = String(new Date().getTime()).substr(-1);
    var price = 200;
    var quantity = 2
    var timestampx2 = 2 + +timestamp
    it('Entonces hace el calculo y mostra las comisiones y el precio total ', () => {
      browser.get('/events/2/comissions')
      browser.sleep(longSleepTime)
      var userComCardFixed = element(by.css(".e2e-user-comission-card-fixed"))
      userComCardFixed.clear()
      var userComCardPercent = element(by.css(".e2e-user-comission-card-percent"))
      userComCardPercent.clear()
      var eventComCardFixed = element(by.css(".e2e-event-comission-card-fixed"))
      eventComCardFixed.clear()
      eventComCardFixed.sendKeys(+timestamp + 1)
      var eventComCardPercent = element(by.css(".e2e-event-comission-card-percent"))
      eventComCardPercent.clear()
      eventComCardPercent.sendKeys(timestampx2 + 1)
      browser.sleep(sleepTime)
      element(by.css('app-comissions-page .btn-large')).click()
      browser.sleep(mediumSleepTime)
      //check current event
      browser.get('/events/2/book')
      browser.sleep(longSleepTime)
      element(by.css('#price')).sendKeys('200')
      element(by.css('.e2e-quantity input.select-dropdown')).click()
      browser.sleep(mediumSleepTime)
      element(by.css('.e2e-quantity  ul li:nth-child(3)')).click()
      browser.sleep(mediumSleepTime)
      element(by.css('.e2e-payment input.select-dropdown')).click()
      browser.sleep(mediumSleepTime)
      element(by.css('.e2e-payment  ul li:nth-child(2)')).click()
      browser.sleep(mediumSleepTime)
      element(by.css('app-book-page .btn-large')).click()
      browser.sleep(longSleepTime)
      var totalPrice = quantity * (price + +timestamp + 1 + price * (timestampx2 + 1) / 100) + 5
      expect(element(by.css('.e2e-total')).getText()).toBe(String(totalPrice))
      expect(element(by.css('.e2e-total-comission')).getText()).toBe(String(totalPrice - quantity * price))
    });
  })
  describe('Cuando escojo pagar con deposito', () => {
    var timestamp = String(new Date().getTime()).substr(-1);
    var price = 200;
    var quantity = 2
    var timestampx2 = 2 + +timestamp
    it('Entonces hace el calculo y mostra las comisiones y el precio total ', () => {
      browser.get('/events/2/comissions')
      browser.sleep(longSleepTime)
      var userComCardFixed = element(by.css(".e2e-user-comission-card-fixed"))
      userComCardFixed.clear()
      var userComCardPercent = element(by.css(".e2e-user-comission-card-percent"))
      userComCardPercent.clear()
      var eventComCardFixed = element(by.css(".e2e-event-comission-card-fixed"))
      eventComCardFixed.clear()
      eventComCardFixed.sendKeys(+timestamp + 1)
      var eventComCardPercent = element(by.css(".e2e-event-comission-card-percent"))
      eventComCardPercent.clear()
      eventComCardPercent.sendKeys(timestampx2 + 1)
      browser.sleep(sleepTime)
      element(by.css('app-comissions-page .btn-large')).click()
      browser.sleep(mediumSleepTime)
      //check current event
      browser.get('/events/2/book')
      browser.sleep(longSleepTime)
      element(by.css('#price')).sendKeys('200')
      element(by.css('.e2e-quantity input.select-dropdown')).click()
      browser.sleep(mediumSleepTime)
      element(by.css('.e2e-quantity  ul li:nth-child(3)')).click()
      browser.sleep(mediumSleepTime)
      element(by.css('.e2e-payment input.select-dropdown')).click()
      browser.sleep(mediumSleepTime)
      element(by.css('.e2e-payment  ul li:nth-child(3)')).click()
      browser.sleep(mediumSleepTime)
      element(by.css('app-book-page .btn-large')).click()
      browser.sleep(longSleepTime)
      var totalPrice = quantity * (price + 2 + price * 2.5 / 100) + 5
      expect(element(by.css('.e2e-total')).getText()).toBe(String(totalPrice))
      expect(element(by.css('.e2e-total-comission')).getText()).toBe(String(totalPrice - quantity * price))
    });
  })
});

describe('Cuando no cambio las comissiones de un evento', () => {
  browser.ignoreSynchronization = true
  describe('Cuando hago un booking del evento', () => {
    describe('Cuando escojo pagar con deposito', () => {
      var price = 200;
      var quantity = 2
      it('Entonces hace el calculo y mostra las comisiones por default y el precio total cuando ', () => {
        browser.get('/events/lArEsa124/book')
        browser.sleep(longSleepTime)
        element(by.css('#price')).sendKeys('200')
        element(by.css('.e2e-quantity input.select-dropdown')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-quantity  ul li:nth-child(3)')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-payment input.select-dropdown')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-payment  ul li:nth-child(3)')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('app-book-page .btn-large')).click()
        browser.sleep(longSleepTime)
        var totalPrice = quantity * (price + 2 + price * 2.5 / 100) + 5
        expect(element(by.css('.e2e-total')).getText()).toBe(String(totalPrice))
        expect(element(by.css('.e2e-total-comission')).getText()).toBe(String(totalPrice - quantity * price))
      });
    })
    describe('Cuando escojo pagar con tarjeta', () => {
      var timestamp = String(new Date().getTime()).substr(-1);
      var price = 200;
      var quantity = 2
      it('Entonces hace el calculo y mostra las comisiones y el precio total cuando ', () => {
        browser.get('/events/lArEsa124/book')
        browser.sleep(longSleepTime)
        element(by.css('#price')).sendKeys('200')
        element(by.css('.e2e-quantity input.select-dropdown')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-quantity  ul li:nth-child(3)')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-payment input.select-dropdown')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('.e2e-payment  ul li:nth-child(2)')).click()
        browser.sleep(mediumSleepTime)
        element(by.css('app-book-page .btn-large')).click()
        browser.sleep(longSleepTime)
        var totalPrice = quantity * (price + 5 + price * 3.5 / 100) + 5
        expect(element(by.css('.e2e-total')).getText()).toBe(String(totalPrice))
        expect(element(by.css('.e2e-total-comission')).getText()).toBe(String(totalPrice - quantity * price))
      });
    })
  })
});