
export class Transaction {
    id: string;
    eventId: string
    eventName: string
    paymentMethod: string    
    price: number
    quantity: number

    deserialize(json: any, id: any) {
        this.id = id;
        this.eventId = json.event_id
        this.eventName = json.event_name
        this.paymentMethod = json.payment_method        
        this.quantity = json.quantity
        this.price = json.price        
        return this;
    }
}