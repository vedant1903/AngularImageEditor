import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadcloudimageService {
  Img :any;
  constructor(){
  }
  SetImg(Img):any{
    this.Img=Img;
  }
  getImg():any{
    return this.Img;
  }
}
