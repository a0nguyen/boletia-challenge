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

  getPaymentMethods() {

  }

  getUserById(id: string): Observable<any> {
    return this.firebaseDb.object(`users/${id}`).snapshotChanges();
  }

  updateEvent(id: string, paymentMethod: string, comissionFixed: number, comissionPercent: number) {
    this.firebaseDb.object(`events/${id}/comissions/${paymentMethod}`).update({ name: paymentMethod, fixed: comissionFixed, percent: comissionPercent });
  }

  updateUser(id: string, paymentMethod: string, comissionFixed: number, comissionPercent: number) {
    this.firebaseDb.object(`users/${id}/comissions/${paymentMethod}`).update({ fixed: comissionFixed, percent: comissionPercent });
  }

  getEvents(): Observable<any> {
    return this.firebaseDb.list("events").snapshotChanges();
  }

  getUsers(): Observable<any> {
    return this.firebaseDb.list("users").snapshotChanges();
  }

  getTransactionByid(key: string): Observable<any> {
    return this.firebaseDb.object(`transactions/${key}`).snapshotChanges();
  }

  pushBooking(event: Event, paymentMethod: string, price: number, quantity: number) {
    var timestamp = new Date().getTime();
    var record = { event_id: event.id, event_name: event.name, payment_method: paymentMethod, price: price, quantity: quantity, id: timestamp, user_id: event.userId }
    return this.firebaseDb.list("transactions").push(record).key
  }
}
