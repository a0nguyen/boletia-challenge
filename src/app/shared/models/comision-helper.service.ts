import { Injectable } from '@angular/core';
import { Comision } from '../../shared/models/comision.model';

@Injectable()
export class ComisionHelperService {

  constructor() { }

  isComissionEmpty(comision: Comision): boolean {
    if (comision.fixed && comision.percent) {
      return true
    }
    return false
  }

  getComission(json: any): Comision {
    var comission = { fixed: null, percent: null }
    if (json) {
      var comission = { fixed: json.fixed ? json.fixed : null, percent: json.percent ? json.percent : null }
    }
    return comission
  }

}
