import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { DatabaseService } from '../../shared/services/database.service';
import { Event } from '../../shared/models/event.model';
declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
  providers: [DatabaseService],
})
export class BookPageComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router, public dbService: DatabaseService) { }
  event: Event

  price: number;
  quantity: number;
  paymentMethod: string;

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.dbService.getEventsById(params['id']))
      .subscribe(event => {
        this.event = new Event().deserialize(event.payload.val(), event.key)
        this.initForm();
      })
  }

  initForm() {
    setTimeout(() => {
      $('select#quantity').material_select(() => this.changeQuantity(event));
      $('select#paymentMehod').material_select(() => this.changePaymentMethod(event));
    }, 1000)
  }

  changeQuantity(event) {
    debugger
    this.quantity = +event.target.outerText
  }

  changePaymentMethod(event) {
    if (event.target.outerText.toLowerCase().includes("tarjeta")) {
      this.paymentMethod = "card"
    } else {
      this.paymentMethod = "deposit"
    }
  }

  submit() {
    if (this.price && this.quantity && this.paymentMethod) {
      var transactionKey = this.dbService.pushBooking(this.event, this.paymentMethod, this.price, this.quantity)
      this.router.navigate(["/receipt", transactionKey])
    } else {
      Materialize.toast('<span><i class="material-icons">error</i></span><span>&nbsp; Por favor ingresa el precio del boleto, la quantidad y el metodo de pago</span>', 4000, 'red lighten-1')
    }
  }

}
