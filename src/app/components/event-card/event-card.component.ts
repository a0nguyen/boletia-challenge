import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Event } from '../../shared/models/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input() users: User[] = [];
  @Input()
  set event(event: Event) {
    if (event) {
      this._event = event;
      this.initDisplayedDatas();
    }
  };

  get event(): Event {
    return this._event
  }

  @Input() action: string

  _event: Event
  displayedUser: User;

  initDisplayedDatas() {
    if (this.users) {
      this.users.forEach((user) => {
        if (this.event.userId == user.id) {
          this.displayedUser = user;
        }
      });
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
