
import { Component, OnInit, ViewChild} from '@angular/core';
import { PreviewService } from '../service/previewservice/preview.service';
import { ImagesInfo } from "../models/inmagesInfo";
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import {CropperComponent} from 'angular-cropperjs'; //this edit component mainly use cropper js for cropping, rotating, zooming the photo

// component has a selector , template , style and other properties, using which it specifies the metadata required to process the component
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {
  imageUrl: any;
  cropperRes: string;//this edit component mainly use cropper-js for cropping, rotating, zooming the photo

  ImagesInfo: ImagesInfo = new ImagesInfo(); //to store the import and export photo data

  width;//the width of the selected area
  height;//the height of the selected area

  cropperConfig: object = { //to config the cropper
    movable: true,
    scalable: true,
    zoomable: true,
    viewMode: 2,
    checkCrossOrigin: true
  };

  @ViewChild('angularCropper') public angularCropper: CropperComponent;

  constructor(private previewService: PreviewService,
              private router: Router) {

  }

  ngOnInit() {
    if(localStorage.getItem("token")==null || localStorage.getItem("token")==undefined){
      this.router.navigate(['login']);
    }
    console.log("Preview service info :", this.previewService.ImagesInfo);

    this.ImagesInfo = this.previewService.ImagesInfo;//get the passed picture data from the preview component
    //if the picture is a local picture uploaded by "add" button.
     if (this.ImagesInfo.localImg !== undefined && this.ImagesInfo.localImg !== null) {
      this.imageUrl = this.ImagesInfo.localImg;
       console.log(this.imageUrl);
     }
    //if the picture is a online picture in this website.
    if (this.ImagesInfo.cloudImg !== undefined && this.ImagesInfo.cloudImg !== null) {
      var imgLink = this.ImagesInfo.cloudImg; // + "?timestamp=" + new Date();
      this.getBase64Image(imgLink).subscribe( //parse picture url to base64 string type picture
        (value) => {
          if (value !== undefined && value !== null) {
            console.log(value);
            this.imageUrl = value;

          }
        }
      )
    }
  }

  /**
   * parse to base64 string type picture
    */
  getBase64Image(imgLink): Observable<any> {
    let subj = new Subject();
    var tempImage = new Image();
    var dataURL;
    tempImage.crossOrigin = "*";
    tempImage.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = tempImage.width;
      canvas.height = tempImage.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(tempImage, 0, 0, tempImage.width, tempImage.height);
      var ext = tempImage.src.substring(tempImage.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      var img = document.createElement("img");
      subj.next(dataURL);
    }

    tempImage.src = imgLink;
    return subj.asObservable();
  }

  /**
   * back to pool
   */
  moveToPool() {
    this.router.navigate(['/pool']);
  }

  /**
   * move to next edit step
   */
  goToReEdit() {
    this.ImagesInfo.tempImg = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
    this.ImagesInfo.width=this.angularCropper.cropper.getCroppedCanvas().width;
    this.ImagesInfo.height=this.angularCropper.cropper.getCroppedCanvas().height;
    console.log(this.ImagesInfo.width);
    console.log(this.ImagesInfo.height);
    console.log("ID is ::: ", this.ImagesInfo.id)
    this.previewService.ImagesInfo = this.ImagesInfo;
    this.router.navigate(['/reEdit']);
  }


  //toolbar functions of cropper-js:

  /**
   * update the cropperRes and the width and height when you change the selected area
   * @param event
   */
  cropendImage(event) {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
    this.width=this.angularCropper.cropper.getCroppedCanvas().width;
    this.height=this.angularCropper.cropper.getCroppedCanvas().height;
  }

  readyImage(event) {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  rotate(turn) {
    turn = turn === 'left' ? -45 : 45;
    this.angularCropper.cropper.rotate(turn);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }


  zoomManual() {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  zoom(status) {
    status = status === 'positive' ? 0.1 : -0.1;
    this.angularCropper.cropper.zoom(status);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  move(offsetX, offsetY) {
    this.angularCropper.cropper.move(offsetX, offsetY);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  scale(offset) {
    if (offset === 'x') {
      this.angularCropper.cropper.scaleX(-1);
    } else {
      this.angularCropper.cropper.scaleY(-1);
    }
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  clear() {
    this.angularCropper.cropper.clear();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  disable() {
    this.angularCropper.cropper.disable();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  enable() {
    this.angularCropper.cropper.enable();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  reset() {
    this.angularCropper.cropper.reset();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

}
