import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import { Event } from '../../shared/models/event.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [DatabaseService],
})
export class HomepageComponent implements OnInit {

  events: Event[]
  users: User[]


  constructor(public dbService: DatabaseService) { }
  url: string = "https://bltassets-cdn3.global.ssl.fastly.net/images/home/home-03.jpg"

  ngOnInit() {
    this.getEvents()
    this.getUsers()
  }

  getEvents() {
    this.dbService.getEvents().subscribe(events => {
      this.events = []
      events.forEach(element => {
        if (element.key != "lArEsa124") {
          this.events.push(new Event().deserialize(element.payload.val(), element.key))
        }
      });
    })
  }

  getUsers() {
    this.dbService.getUsers().subscribe(users => {
      this.users = []
      users.forEach(element => {
        this.users.push(new User().deserialize(element.payload.val(), element.key))
      });
    })
  }

}
