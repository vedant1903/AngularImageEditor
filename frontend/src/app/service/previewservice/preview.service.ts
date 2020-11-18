import { Injectable, EventEmitter } from '@angular/core';
import { ImagesInfo } from '../../models/inmagesInfo';
import {Subject} from 'rxjs';

//  @Injectable() decorator marks it as a service that can be injected, but Angular can't actually inject it anywhere until you configure an Angular dependency injector with a provider of that service
@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  ImagesInfo:ImagesInfo;
  getImg:any;
  constructor(){
    this.getImg = new EventEmitter();
  }

}
