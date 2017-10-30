module.exports = function () {
    this.CalculateComissionAndTotal = class CalculateComissionAndTotal {
        constructor(transaction, functionToGetComission, paymentMethods, paymentMethodName, quantity, unitPrice) {
            this.listOfEventComission = functionToGetComission(transaction)
            this.listOfPaymentMethod = paymentMethods
            this.paymentMethodName = paymentMethodName
            this.quantity = quantity
            this.unitPrice = unitPrice
        }

        getPaymentMethodComission() {
            var comissionFromEvent = this.listOfEventComission.filter((eventComission) => {
                return eventComission.paymentMethod.name == this.paymentMethodName;
            });
            var defaultComission = this.listOfPaymentMethod.filter((paymentMethod) => {
                return paymentMethod.name == this.paymentMethodName;
            });
            this.comissionCalcul = comissionFromEvent[0] && comissionFromEvent[0].paymentMethod.calculFunction ? comissionFromEvent[0].paymentMethod.calculFunction : defaultComission[0].calculFunction
            this.comission = comissionFromEvent[0] ? comissionFromEvent[0].comission : defaultComission[0].comission
        }

        calculateTotalComission() {
            this.totalComission = Math.round(this.comissionCalcul(this.quantity, this.comission, this.unitPrice), -2)
        }

        calculateTotalPrice() {
            this.totalPrice = this.totalComission + this.quantity * this.unitPrice
        }

        call() {
            this.getPaymentMethodComission()
            this.calculateTotalComission()
            this.calculateTotalPrice()
            return { total_comission: this.totalComission, total_price: this.totalPrice }
        }
    },

        this.EventComission = class EventComission {
            constructor(paymentMethod, comission) {
                this.paymentMethod = paymentMethod;
                this.comission = comission
            }
        },

        this.PaymentMethod = class PaymentMethod {
            constructor(name, defaultComission, calculFunction) {
                this.name = name;
                this.comission = defaultComission
                this.calculFunction = calculFunction
            }
        }
}
