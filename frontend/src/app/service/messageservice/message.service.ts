import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  requestUrl: string = 'http://localhost:3301/';
  constructor(private http:HttpClient) { }

  /**
   * To set the otp in the database for that particular user 
   * PUT : /users/:userName
   * */ 

  setOTP(username:string, otp:string):Observable <any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.put(this.requestUrl + "users/"+ username, {
      otp: otp
    }, httpOptions);
  }

  /**
   * To set the send the OTP to the user through Nexmo API 
   * POST : /users/:userName/sendMessage 
   * */ 
  
  sendOTP(phoneNumber:string, otp:string, userName):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post(this.requestUrl + `users/${userName}/sendMessage`, {
      otp: otp,
      phoneNumber: phoneNumber
    }, httpOptions);
  }

}
