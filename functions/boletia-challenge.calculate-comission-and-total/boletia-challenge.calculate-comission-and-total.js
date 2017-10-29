module.exports = function () {
    this.CalculateComissionAndTotal = class CalculateComissionAndTotal {
        constructor(eventComissions, paymentMethods, paymentMethodName, quantity, unitPrice) {
            this.listOfEventComission = eventComissions
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
            this.comissionType = comissionFromEvent[0] && comissionFromEvent[0].paymentMethod.type ? comissionFromEvent[0].paymentMethod.type : defaultComission[0].type
            this.comission = comissionFromEvent[0] ? comissionFromEvent[0].comission : defaultComission[0].comission
        }

        calculateTotalComission() {
            if (this.comissionType == "percent") {
                this.totalComission = this.quantity * this.comission * this.unitPrice;
            } else {                               
                this.totalComission = this.quantity * this.comission;
            }
            this.totalComission = Math.round(this.totalComission, -2)
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
            constructor(name, defaultComission, type) {
                this.name = name;
                this.comission = defaultComission
                this.type = type
            }
        }
}
