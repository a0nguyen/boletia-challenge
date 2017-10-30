const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
require('./boletia-challenge.calculate-comission-and-total/boletia-challenge.calculate-comission-and-total.js')()


exports.calculateComissionsAndTotal = functions.database.ref('/transactions/{pushId}')
  .onWrite(event => {
    // Grab the current value of what was written to the Realtime Database.
    const transaction = event.data.val();
    var cardPaymentMethod = new PaymentMethod("card", "0.035", "percent");
    var depositPaymentMethod = new PaymentMethod("deposit", "10", "uint");

    var eventComissions = []
    if (transaction.card_comission) {
      eventComissions.push(new EventComission(cardPaymentMethod, transaction.card_comission));
    }
    if (transaction.deposit_comission) {
      eventComissions.push(new EventComission(depositPaymentMethod, transaction.deposit_comission));
    }

    const results = new CalculateComissionAndTotal(eventComissions, [cardPaymentMethod, depositPaymentMethod], transaction.payment_method, transaction.quantity, transaction.price).call()
    return event.data.ref.update({ total_comission: results.total_comission, total: results.total_price });
  });

  // run cloud functions calculateComissionsAndTotal({after: { card_comission: "0.1", deposit_comission: "4", event_id: "2", event_name: "concierto de j balvin", id: 1509330471937, payment_method: "deposit", price: 200, quantity: 2}})
