import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Mails} from '../../models/mails';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailserviceService {
  requestUrl: string = 'http://localhost:3301';
  mainls: Mails = new Mails();

  constructor(private http: HttpClient) {
  }
  // Route: /users/:username/sendmail
  // Observable are just that — things you wish to observe and take action on. Angular uses the Observer pattern which simply means — Observable objects are registered

  /*SendMail(mails): Observable<any> {
    let httpOptions;
    // Add Authorization header to the request
    if(mails.Action === 'share') {
      const bearer = 'Bearer ' + localStorage.getItem('token').toString();
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': bearer
        })
      };
    } else {
       httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
    }*/

  SendMail(mails):Observable<any>
  {
    // Add Authorization header to the request 
    //const bearer = "Bearer " + localStorage.getItem("token").toString();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        // 'Authorization' : bearer
      })
    };


    let body = JSON.stringify(mails);
    console.log(body);

    let userName = sessionStorage.getItem('user');

    return this.http.post<Mails>(this.requestUrl + '/users/' + userName + '/sendEmail', body, httpOptions);
  }
}
