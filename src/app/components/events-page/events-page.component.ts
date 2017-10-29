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

  ngOnInit() {
  }

  valuechange(event) {
    if (isNumeric(this.idOfEvent)) {
      this.dbService.getEventsById(this.idOfEvent).subscribe(event => {
        this.event = new Event().deserialize(event.payload.val(), event.key)
        if (this.comissionCard == null || !this.comissionDeposit == null) {
          this.comissionCard = this.event.comissionCard
          this.comissionDeposit = this.event.comissionDeposit
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
    if (!isNumeric(this.comissionCard) && !isNumeric(this.comissionDeposit)){
      Materialize.toast('<span><i class="material-icons">error</i></span><span>&nbsp; Por favor ingresa numeros para las comisiones</span>', 4000, 'red lighten-1')      
    }
    else {
      this.dbService.updateEvent(this.idOfEvent, this.comissionDeposit, this.comissionCard)      
    }
  }

}
