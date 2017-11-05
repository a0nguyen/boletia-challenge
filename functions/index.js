const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
require('./boletia-challenge.calculate-comission-and-total/boletia-challenge.calculate-comission-and-total.js')()


exports.calculateComissionsAndTotal = functions.database.ref('/transactions/{pushId}')
  .onWrite(dbEvent => {

    var transaction = dbEvent.data.val();

    const boletiaFixed = 5
    const defaultComissions = { card: { fixed: 5, percent: 3.5 }, deposit: { fixed: 2, percent: 2.5 } }

    return admin.database()
      .ref(`/events/${transaction.event_id}`)
      .once('value', (snapshot) => {
        var event = snapshot.val();
        admin.database()
          .ref(`/users/${event.user_id}`).once('value', (snapshot) => {
            var user = snapshot.val();
            console.log("DEBUG : user comission ", user.comissions, "transaction ", transaction)
            var results = new CalculateComissionAndTotal(user, event, defaultComissions, transaction.payment_method, transaction, boletiaFixed).call();  
            console.log("RESULTS : total comissions : ", results.total_comission, "total price : ", results.total_price, "comissions :", results.comission)            
            dbEvent.data.ref.update({ total_comission: results.total_comission, total: results.total_price, comission: results.comission });            
          })
      })
  });

  // run cloud function
  // calculateComissionsAndTotal({after: { event_id: "2", event_name: "concierto de j balvin", id: 1509330471937, payment_method: "deposit", price: 100, quantity: 2}})