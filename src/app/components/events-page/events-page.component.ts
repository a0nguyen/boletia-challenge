import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import { Event } from '../../shared/models/event.model';
import { isNumeric } from 'rxjs/util/isNumeric';
declare var Materialize: any;

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css'],
  providers: [DatabaseService],
})
export class EventsPageComponent implements OnInit {

  constructor(public dbService: DatabaseService) { }

  idOfEvent: string = ""
  event: Event;
  comissionDeposit: number;
  comissionCard: number;
  eventKey: string
  updated: boolean = false;

  ngOnInit() {
  }

  valuechange(event) {
    if (isNumeric(this.idOfEvent)) {
      this.dbService.getEventsById(this.idOfEvent).subscribe(event => {
        this.event = new Event().deserialize(event.payload.val(), event.key)
        if (this.event.id != this.eventKey || this.updated) {
          this.eventKey = this.event.id
          this.comissionCard =  this.round(this.event.comissionCard * 100, 2)
          this.comissionDeposit = this.event.comissionDeposit
          this.updated = false
        }
      })
    }
  }

  onInputClick(event) {
    var target = event.target
    if (target && target.labels[0] && !target.labels[0].className.includes("active")) {
      target.labels[0].className += " " + "active";
    }
  }

  onFocusOut(event) {
    var target = event.target
    if (target && !target.value && target.labels[0] && target.labels[0].className.includes("active")) {
      target.labels[0].className = ""
    }
  }

  submit() {
      this.dbService.updateEvent(this.idOfEvent, this.comissionDeposit, (this.comissionCard / 100))
      this.updated = true
      Materialize.toast('<span>Hicimos update de las comisiones del evento</span>', 4000, 'green lighten-1')      
  }

  round(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  };
}
