import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { DatabaseService } from '../../shared/services/database.service';
import { Event } from '../../shared/models/event.model';
import { Transaction } from '../../shared/models/transaction.model';

@Component({
  selector: 'app-receipt-page',
  templateUrl: './receipt-page.component.html',
  styleUrls: ['./receipt-page.component.css'],
  providers: [DatabaseService],
})
export class ReceiptPageComponent implements OnInit {

  comission: string
  constructor(public route: ActivatedRoute, public router: Router, public dbService: DatabaseService) { }
  transaction: Transaction
  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.dbService.getTransactionByid(params['id']))
      .subscribe(transaction => {
        var json = transaction.payload.val()
        this.transaction = new Transaction().deserialize(json, transaction.key)
        if(json.comission){
          this.comission = `${json.comission.fixed}$ + ${json.comission.percent}%`          
        }
      })
  }

}
