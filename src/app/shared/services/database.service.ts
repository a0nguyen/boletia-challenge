import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Event } from '../../shared/models/event.model';


@Injectable()
export class DatabaseService {

  constructor(public firebaseDb: AngularFireDatabase) { }

  getEventsById(id: string): Observable<any> {
    return this.firebaseDb.object(`events/${id}`).snapshotChanges();        
  }

  updateEvent(id: string, comissionDeposit: number, comissionCard: number) {
    this.firebaseDb.object(`events/${id}`).update({ comission_deposit: comissionDeposit, comission_card: comissionCard });
  }

  getEvents(): Observable<any> {
    return this.firebaseDb.list("events").snapshotChanges();
  }

  getTransactionByid(key: string): Observable<any> {
    return this.firebaseDb.object(`transactions/${key}`).snapshotChanges();    
  }

  pushBooking(event: Event, paymentMethod: string, price: number, quantity: number) {
    var timestamp = new Date().getTime();
    return this.firebaseDb.list("transactions").push({ event_id: event.id, event_name: event.name, payment_method: paymentMethod, price: price, quantity: quantity, id: timestamp, card_comission: event.comissionCard, deposit_comission: event.comissionDeposit }).key
  }

}
