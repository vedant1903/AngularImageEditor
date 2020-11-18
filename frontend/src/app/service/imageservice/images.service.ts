import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Images} from '../../models/images';

//  injector is responsible for creating service instances and injecting them into classes
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  requestUrl: string = 'http://localhost:3301';

  constructor(private http: HttpClient) {
  }

  /**
   *
   * Retrieve image for a user: Url: /users/:username/images, method: GET
   * Upload image for a user: Url: /users/:username/images, method: POST
   * Delete image for a user: Url: /users/:username/images, method: Delete
   * Update image for a user: Url: /users/:username/images, method: Put
   */



  // Retrieve image for a user. If no user is specified, it returns all the images in the database
  RetrieveAllImage(username) {
    const token = localStorage.getItem('token').toString();
    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      })
    };
    return this.http.get(this.requestUrl + '/users/' + username + '/images', httpOptions);
  }

  // Upload and return a new image
  UploadNewImage(image: Images, username: string) {
    const bearer = 'Bearer ' + localStorage.getItem('token').toString();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': bearer
      })
    };
    return this.http.post(this.requestUrl + '/users/' + username + '/images', {
      imgData: image.img,
      userName: username,
      id: image.id

    }, httpOptions);
  }

  // Delete
  DeleteImage(img, userName) {
    const bearer = 'Bearer ' + localStorage.getItem('token').toString();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': bearer
      }),
      body: {
        img: img
      }
    };
    return this.http.delete(this.requestUrl + '/users/' + userName + '/images', httpOptions);
  }

  // Replace an image
  UpdateImage(image: Images, img: string, userName: string) {
    const bearer = 'Bearer ' + localStorage.getItem('token').toString();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'status': '200',
        'Authorization': bearer
      })
    };
    return this.http.put(this.requestUrl + '/users/' + userName + '/images', {
      imgData: image.img,
      img: img,
      userName
      // id: image.id

    }, httpOptions);
  }

  // No JWT token required to be sent as users can get the OCR even without being logged in
  SendImageForOCR(data: string, file: File) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(this.requestUrl + '/getOCR', {
      data,
      file
    }, httpOptions);

  }

}
