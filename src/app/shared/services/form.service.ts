import { Injectable } from '@angular/core';

@Injectable()
export class FormService {

  constructor() { }
  
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

}
