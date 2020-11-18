import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import {Mails} from '../models/mails';//for sending the email
import {MailserviceService} from '../service/mailservice/mailservice.service';

import {ImagesInfo} from '../models/inmagesInfo';
import {PreviewService} from '../service/previewservice/preview.service';
import {ImagesService} from '../service/imageservice/images.service';
import {Images} from '../models/images';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

//this component is the end of the editing, you can make some action like: download the picture, or upload it to server, or send it through Email
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})


export class ConfirmComponent implements OnInit {

  //  Pattern for e-mail matching component
  pattern: any = /^[0-9A-Za-z]+(\.[a-zA-Z0-9_-]+)*@[0-9A-Za-z_]+(\.[a-zA-Z0-9_-]+)+$/g;
  mails: Mails = new Mails();
  canvasImg: any; //the image on canvas
  // header:string="";

  Img: Images = new Images();

  imagesInfo: ImagesInfo = new ImagesInfo(); //to store the import and export photo data
  width;//the width and height of the picture
  height;

  //usage of 3 services
  constructor(private router: Router,
              private previewService: PreviewService,
              private mailService: MailserviceService,
              private imageService: ImagesService,
              private http: HttpClient) {
    this.mails.To = '';
    this.mails.title = '';
    this.mails.content = '';

  }


  ngOnInit() {
    if(localStorage.getItem("token")==null || localStorage.getItem("token")==undefined){
      this.router.navigate(['login']);
    }
    //pass the image data from re-edit component
    this.imagesInfo = this.previewService.ImagesInfo;
    this.height = this.imagesInfo.height;
    this.width = this.imagesInfo.width;
    this.canvasImg = this.imagesInfo.tempImg; //put it on canvas

  }

  /**
   * send your picture through email
   */
  send() {
    if (this.mails.title == '') {
      alert('Please input your title');
      return;
    }
    if (!this.mails.To.match(this.pattern)) {
      alert('invalid mail');
      return;
    }

    if (this.mails.title == '') {
      alert('Please input your title');
      return;
    }


    // console.log(this.canvasImg);

    this.mails.content = this.canvasImg;
    this.mails.Action = 'share';
    console.log(this.mails.content);
    //console.log('1234'+this.header);
    this.mailService.SendMail(this.mails).subscribe((data) => {
    });
    alert('send successfully');
  }

  //download the picture on the canvas
  download() {
    this.downloadFile('Image', this.canvasImg);
  }

  //update the existing online picture in the server
  saveold() {
    //this.Img.img=this.imagesInfo.tempImg;

    if (this.imagesInfo.localImg) {
      this.Img.img = this.imagesInfo.tempImg;
      this.Img.id = Date.now();
      //console.log(this.Img);
      this.imageService.UploadNewImage(this.Img, sessionStorage.getItem('user')).subscribe(value => {
        console.log(value);
      });
    } else if (this.imagesInfo.cloudImg) {
      this.Img.img = this.imagesInfo.tempImg;
      console.log("passing ", this.Img , "\nand\n", this.imagesInfo.cloudImg);
      var uName = localStorage.getItem("user");
      this.imageService.UpdateImage(this.Img, this.imagesInfo.cloudImg, uName).subscribe(value => {
        console.log(value);
      });
    }


    alert('^_^ Picture updated online.');
  }

  //uplaod the picture to server and create a new one
  savenew() {
    //console.log('Sending data', this.imagesInfo.tempImg);
    this.Img.img = this.imagesInfo.tempImg;
    this.Img.id = Date.now();
    //console.log(this.Img);
    this.imageService.UploadNewImage(this.Img, sessionStorage.getItem('user')).subscribe(value => {
      console.log("Returned from yuploadimage service", value);
      alert('^_^ New picture saved online.');
    });
    
  }

// Converting the image to data URI


  /* savenew() {
     this.http.post('http://localhost:3301/Imagebank/Save',
       {
         imgData: this.imagesInfo.tempImg,
         userName: sessionStorage.getItem('user'),
         id: Date.now()
       },
       {
         headers: new HttpHeaders({'Content-Type': 'application/json'})
       }).subscribe((data: any) => {
       console.log(data);
     });
     alert('^_^ Picture saved online.');
   }*/

// Converting the image to data URI
  dataURItoFile(dataURI, fileName) {

    var byteString = atob(dataURI.split(',')[1]);

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ia], fileName, {type: 'image/jpeg', lastModified: Date.now()});
  }

  //download the picture to your disk
  downloadFile(filename, content) {
    console.log('download');
    var base64Img = content;
    var oA = document.createElement('a');
    oA.href = base64Img;
    oA.download = filename;
    var event = document.createEvent('MouseEvents'); //create an event
    event.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    oA.dispatchEvent(event);
  }


}
