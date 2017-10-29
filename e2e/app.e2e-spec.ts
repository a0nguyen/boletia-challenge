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
      var eventComCard = element(by.id("eventComCard"))
      eventComCard.clear()
      eventComCard.sendKeys(timestamp)
      browser.sleep(sleepTime)
      element(by.css('app-events-page .btn-large')).click()
      browser.sleep(sleepTime)
      // check that event has been update
      browser.get('/events')
      browser.sleep(sleepTime)
      var eventId = element(by.id("eventId"))
      eventId.sendKeys('2')
      browser.sleep(mediumSleepTime)
      expect(element(by.css('.card-content p')).getText()).toBe("concierto de j balvin")
      expect(element(by.css('.card-action #eventComCard')).getAttribute('value')).toBe(timestamp)
    });
  });
});

describe('Dado que ingresas a la página de compra', () => {
  browser.ignoreSynchronization = true
  it('Entonces mostrar el formulario para ingresar el precio del boleto Y la cantidad de boletos Y seleccionar el método de pago', () => {
    browser.get('/events/2/book')
    browser.sleep(mediumSleepTime)
    expect(element(by.css('#price'))).toBeTruthy()
    expect(element(by.css('#paymentMehod'))).toBeTruthy()
    expect(element(by.css('#quantity'))).toBeTruthy()
  });
  describe('Cuando se hace submit', () => {
    it('monstrar el resumen', () => {
      browser.get('/events/2/book')
      browser.sleep(mediumSleepTime)
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
      expect(browser.getCurrentUrl()).toContain("/receipt/")
    });
  });
});

describe('Dado que ya creaste un booking, después de realizar el cálculo', () => {
  browser.ignoreSynchronization = true
    it('Entonces mostrar el resumen de compra que incluye la cantidad de boletos comprados, el precio Y el cálculo de las comisiones Y el total a pagar', () => {
      browser.get('/events/2/book')
      browser.sleep(mediumSleepTime)
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
