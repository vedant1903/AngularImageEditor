import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {User} from '../../models/users';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})

// Stores User Login Account Details and setting up connection from backend
export class UsersService {
  requestUrl:string='http://localhost:3301';

  constructor(private http:HttpClient){}


  Login(account:string,password:string):Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<User>(this.requestUrl+'/users/authentication',{
      account,
      password,
      "type" : "password"
    });
  }


  Register(user:User):Observable<any>
  {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
     })
   };
   let body=JSON.stringify(user);
   console.log(body);
   return this.http.post<User>(this.requestUrl+'/users/registration',body,httpOptions);
  }

  reset(account: string, password: string):Observable<any>{

    return this.http.put<User>('http://localhost:3301/users/reset/' + account, {
        password: password
      },
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    );

  }

  OtpLogin(userName:string,otp:string):Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    //return this.http.post<User>(this.requestUrl+'/users/authentication?userName='+userName+'&otp='+otp+ '&type=otp');
    return this.http.post<User>(this.requestUrl+'/users/authentication?userName='+userName+'&otp='+otp+ '&type=otp',{
      userName,
      otp,
      "type": "otp"
    });
  }
}
