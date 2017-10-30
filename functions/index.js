const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
require('./boletia-challenge.calculate-comission-and-total/boletia-challenge.calculate-comission-and-total.js')()


exports.calculateComissionsAndTotal = functions.database.ref('/transactions/{pushId}')
  .onWrite(event => {

    const transaction = event.data.val();
    //default value
    var cardPaymentMethod = { name: "card", comission: "0.035", calculFunction: (quantity, comission, price) => { return quantity * comission * price } }
    var depositPaymentMethod = { name: "deposit", comission: 10, calculFunction: (quantity, comission, price) => { return quantity * comission } }

    //way of getting comissions from transaction
    getComissions = (transaction) => {
      var eventComissions = []
      if (transaction.card_comission) {
        eventComissions.push({ paymentMethod: cardPaymentMethod, comission: transaction.card_comission });
      }
      if (transaction.deposit_comission) {
        eventComissions.push({ paymentMethod: depositPaymentMethod, comission: transaction.deposit_comission });
      }
      return eventComissions
    }

    const results = new CalculateComissionAndTotal(transaction, getComissions, [cardPaymentMethod, depositPaymentMethod], transaction.payment_method, transaction.quantity, transaction.price).call()
    console.log("RESULTS : total comissions : ", results.total_comission, "total price : ", results.total_price)
    return event.data.ref.update({ total_comission: results.total_comission, total: results.total_price });
  });

  // run cloud function
  // calculateComissionsAndTotal({after: { card_comission: "0.1", deposit_comission: "4", event_id: "2", event_name: "concierto de j balvin", id: 1509330471937, payment_method: "deposit", price: 200, quantity: 2}})
