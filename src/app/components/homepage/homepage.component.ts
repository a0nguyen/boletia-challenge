import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import { Event } from '../../shared/models/event.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [DatabaseService],  
})
export class HomepageComponent implements OnInit {

  events: Event[]

  constructor(public dbService: DatabaseService) { }
  url: string = "https://bltassets-cdn3.global.ssl.fastly.net/images/home/home-03.jpg"

  ngOnInit() {
    this.dbService.getEvents().subscribe(events => {
      this.events = []
      events.forEach(element => {
        this.events.push(new Event().deserialize(element.payload.val(), element.key))
      });
    })
  }

  changePicture() {
    setTimeout(() => {
      this.url = "https://bltassets-cdn3.global.ssl.fastly.net/images/home/home-04.jpg"
    }, 3000)
  }

}
