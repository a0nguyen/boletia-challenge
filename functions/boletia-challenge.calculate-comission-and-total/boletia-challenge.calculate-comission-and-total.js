module.exports = function () {
    this.CalculateComissionAndTotal = class CalculateComissionAndTotal {
        constructor(user, event, defaultComissions, paymentMethodName, transaction, boletiaFixedComission) {
            this.user = user
            this.event = event
            this.defaultComissions = defaultComissions
            this.paymentMethodName = paymentMethodName
            this.quantity = transaction.quantity
            this.unitPrice = transaction.price
            this.boletiaFixedComission = boletiaFixedComission
        }

        getPaymentMethodComission() {
            if (this.event.comissions && this.event.comissions[this.paymentMethodName] && this.event.comissions[this.paymentMethodName].fixed && this.event.comissions[this.paymentMethodName].percent) {
                this.comission = { fixed: this.event.comissions[this.paymentMethodName].fixed, percent: this.event.comissions[this.paymentMethodName].percent }
            }
            else if (this.user.comissions && this.user.comissions[this.paymentMethodName] && this.user.comissions[this.paymentMethodName].fixed && this.user.comissions[this.paymentMethodName].percent ) {
                this.comission = { fixed: this.user.comissions[this.paymentMethodName].fixed, percent: this.user.comissions[this.paymentMethodName].percent }
            } else {
                this.comission = this.defaultComissions[this.paymentMethodName]
            }
        }

        calculateTotalPrice() {
            this.totalPrice = Math.round(this.quantity * (this.unitPrice + this.comission.fixed + this.unitPrice * this.comission.percent / 100) + this.boletiaFixedComission, -2)
            console.log(this.totalPrice)
        }

        calculateTotalComission() {
            this.totalComission = this.totalPrice - this.quantity * this.unitPrice
        }

        call() {
            this.getPaymentMethodComission()
            this.calculateTotalPrice()
            this.calculateTotalComission()
            return { total_comission: this.totalComission, total_price: this.totalPrice, comission: this.comission }
        }
    }
}
