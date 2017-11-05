import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { DatabaseService } from '../../shared/services/database.service';
import { ComisionHelperService } from '../../shared/models/comision-helper.service';

import { Event } from '../../shared/models/event.model';
import { User } from '../../shared/models/user.model';
import { Comision } from '../../shared/models/comision.model';

declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-comissions-page',
  templateUrl: './comissions-page.component.html',
  styleUrls: ['./comissions-page.component.css'],
  providers: [DatabaseService, ComisionHelperService]
})
export class ComissionsPageComponent implements OnInit {

  event: Event
  user: User

  userKey: string
  eventKey: string

  updated: boolean = false;

  userCardComission: Comision = { fixed: null, percent: null };
  userDepositComission: Comision = { fixed: null, percent: null };

  eventCardComission: Comision = { fixed: null, percent: null };
  eventDepositComission: Comision = { fixed: null, percent: null };


  constructor(public route: ActivatedRoute, public router: Router, public dbService: DatabaseService, public comisionHelperService: ComisionHelperService) { }

  ngOnInit() {
    this.getEvent()
  }

  getEvent() {
    this.route.params
      .switchMap((params: Params) => this.dbService.getEventsById(params['id']))
      .subscribe(event => {
        var json = event.payload.val()
        this.event = new Event().deserialize(json, event.key)
        if (this.updated || this.event.id != this.eventKey) {
          if (json.comissions) {
            this.eventCardComission = this.comisionHelperService.getComission(json.comissions.card)
            this.eventDepositComission = this.comisionHelperService.getComission(json.comissions.deposit)
          }
        }
        this.getUser();
      })
  }

  getUser() {
    this.dbService.getUserById(this.event.userId).subscribe(user => {
      var json = user.payload.val()
      this.user = new User().deserialize(json, user.key)
      if (this.updated || this.user.id != this.userKey) {
        if (json.comissions) {
          this.userCardComission = this.comisionHelperService.getComission(json.comissions.card)
          this.userDepositComission = this.comisionHelperService.getComission(json.comissions.deposit)
        }
      }

      this.updated = false
    })
  }

  submit() {
    this.dbService.updateUser(this.user.id, "deposit", this.userDepositComission.fixed, this.userDepositComission.percent)
    this.dbService.updateUser(this.user.id, "card", this.userCardComission.fixed, this.userCardComission.percent)
    this.dbService.updateEvent(this.event.id, "card", this.eventCardComission.fixed, this.eventCardComission.percent)
    this.dbService.updateEvent(this.event.id, "deposit", this.eventDepositComission.fixed, this.eventDepositComission.percent)
    this.updated = true
  }


}
