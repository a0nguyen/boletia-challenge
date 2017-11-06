import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import { Event } from '../../shared/models/event.model';
import { isNumeric } from 'rxjs/util/isNumeric';
import { User } from '../../shared/models/user.model';

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
  events: Event[];  
  users: User[]
  
  
  ngOnInit() {
    this.getEvents()
    this.getUsers()
  }

  getEvents() {
    this.dbService.getEvents().subscribe(events => {
      this.events = []
      events.forEach(element => {
        if (element.key != "lArEsa124") {//this event is only for test purpose
          this.events.push(new Event().deserialize(element.payload.val(), element.key))
        }
      });
    })
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

  getUsers() {
    this.dbService.getUsers().subscribe(users => {
      this.users = []
      users.forEach(element => {
        this.users.push(new User().deserialize(element.payload.val(), element.key))
      });
    })
  }

  valuechange(event) {
    if (isNumeric(this.idOfEvent)) {
      this.dbService.getEventsById(this.idOfEvent).subscribe(event => {
        this.event = new Event().deserialize(event.payload.val(), event.key)
      })
    }
  }
}
