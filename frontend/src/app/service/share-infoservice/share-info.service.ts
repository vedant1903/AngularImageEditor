import { ShareInfoClass } from '../../models/ShareInfoClass';
import { Injectable, EventEmitter } from '@angular/core';

//  @Injectable() decorator marks it as a service that can be injected, but Angular can't actually inject it anywhere until you configure an Angular dependency injector with a provider of that service
@Injectable({
  providedIn: 'root'
})


export class ShareInfoService {
  shareInfo: ShareInfoClass;
  logIn : Boolean = false;
  userName : string;
  change : EventEmitter<any>;
  constructor() {
    this.change = new EventEmitter();
   }
}
