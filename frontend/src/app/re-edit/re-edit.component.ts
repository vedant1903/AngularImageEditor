import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { PreviewService } from '../service/previewservice/preview.service';
import { ImagesInfo } from "../models/inmagesInfo";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

//  this component use HTML5 Canvas to manipulate pixels of the picture selected in "edit" component.

@Component({
  selector: 'app-re-edit',
  templateUrl: './re-edit.component.html',
  styleUrls: ['./re-edit.component.scss']
})
export class ReEditComponent implements OnInit {

  imageUrl = null;

  height; //the height and width of the picture on the canvas
  width;

  ImagesInfo: ImagesInfo = new ImagesInfo(); //to store the import and export photo data

  imageOn: boolean = false; //used by editStyle()


  text: string; //the added string
  light: number; //the brightness
  opacitynum: number; // the opacity

  //following are used by Canvas:
  newCanvas: HTMLCanvasElement;
  newImage: HTMLImageElement;
  ctx: any;
  //manipulating pixels data:
  pixels: any;
  pixeldata: any;
  pixelsNoText: any;

  /**
   *
   * @param previewService
   * @param router
   * @param dialog
   * @param el
   * @param renderer2
   */
  constructor(private previewService: PreviewService,
              private router: Router,
              public dialog: MatDialog,
              private el: ElementRef,
              private renderer2: Renderer2) {

  }

  /**
   * pass the selected picture data in last "edit" step
    */
  ngOnInit() {
    if(localStorage.getItem("token")==null || localStorage.getItem("token")==undefined){
      this.router.navigate(['login']);
    }
    this.ImagesInfo = this.previewService.ImagesInfo; //pass the picture data from service
    this.imageUrl = this.ImagesInfo.tempImg;
    this.height=this.ImagesInfo.height; //pass the height and width
    this.width=this.ImagesInfo.width;
    this.getEl(); // start using canvas

  }

  /**
   * store the picture data in the canvas and go to the confirm page
   */
  goToConfirm() {
    this.previewService.ImagesInfo.tempImg = this.newCanvas.toDataURL();// get the picture data in the canvas
    this.previewService.ImagesInfo = this.ImagesInfo; //pass the data to the service
    console.log("going to confirm component id is : ", this.previewService.ImagesInfo.id);
    this.router.navigate(['/confirm']);
  }


  /**
   * this part add the text at left top of the picture
   */
  addText() {
    this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
    this.ctx.putImageData(this.pixels, 0, 0);
    // this.ctx.font = "30px Arial";
    this.ctx.font = "30px Arial"; // the text font and size
    // Create gradient
    var gradient = this.ctx.createLinearGradient(1, 0, this.newCanvas.width, 0);
    gradient.addColorStop("0.2", "magenta");
    gradient.addColorStop("0.6", "yellow");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    this.ctx.strokeStyle = gradient;
    //this.ctx.strokeText(this.text, 20, 25);
    this.ctx.fillText(this.text, 30, 40);
  }

  /**
   * start using canvas
   */
  getEl() {
    console.log("in getEl");
    this.newCanvas = this.el.nativeElement.querySelector('.newCanvas');
    console.log("in getEl" + this.newCanvas);
    this.newImage = this.el.nativeElement.querySelector('.newImage');
    console.log("in getEl" + this.newImage);
    this.renderer2.setStyle(this.newImage, "display", "none");/////////////////////
    console.log(this.newImage);

    this.newImage.src = this.previewService.ImagesInfo.tempImg;

    console.log(this.newImage.src);

    this.editStyle(); //draw the photo on canvas

  }

  /**
   *  Initializeing and draw photo on canvas
   */
  editStyle() {
    console.log(this.newImage);
    console.log(this.newCanvas.toDataURL());
    this.newImage.onload = () => {
      this.ctx = this.newCanvas.getContext("2d");
      // this.tempWidth = window.getComputedStyle(this.el.nativeElement.querySelector(".newImage")).width;
      // this.tempHeight = window.getComputedStyle(this.el.nativeElement.querySelector(".newImage")).height;
      //console.log(this.tempHeight+"and"+this.tempWidth);
      this.ctx.drawImage(this.newImage, 0, 0, this.newImage.width, this.newImage.height);
      this.pixels = this.ctx.getImageData(0, 0, this.newImage.width, this.newImage.height);
      this.pixeldata = this.pixels.data;
      if (!this.imageOn) {
        this.pixelsNoText = this.ctx.getImageData(0, 0, this.newImage.width, this.newImage.height);
        this.imageOn = true;
      }

    }

  }

  //remove all the after effects and back to initial picture
  clearAll(){
    this.newImage.src = this.previewService.ImagesInfo.tempImg;

    console.log(this.newImage.src);

    this.editStyle();
  }

  // To navigate to Pool component
  moveToPool() {
    this.router.navigate(['/pool']);
  }

  //  Implementing gray functionality which makes the image gray
  grayscale() {
      //pixel opearation:
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
        var gray = (parseInt(this.pixels.data[i]) + parseInt(this.pixels.data[i + 1]) + parseInt(this.pixels.data[i + 2]) )/3;
        this.pixels.data[i] = gray;
        this.pixels.data[i + 1] = gray;
        this.pixels.data[i + 2] = gray;
      }
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixels, 0, 0);

  }

  //  Implementing hue_rotate
  hue_rotate() {
      //pixel opearation:
      for (var i = 0; i < this.pixels.data.length; i += 4) {
        this.pixels.data[i] = 255 - this.pixels.data[i];
        this.pixels.data[i + 1] = 255 - this.pixels.data[i + 1];
        this.pixels.data[i + 2] = 255 - this.pixels.data[i + 2];
        this.pixels.data[i + 3] = 255;
      }
      this.ctx.putImageData(this.pixels, 0, 0);

  }

  //  Implementing opacity functionality, it blurs the image
  opacity() {
      //pixel opearation:
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
        this.pixels.data[i + 3] = 255*this.opacitynum/100;
      }
      this.ctx.clearRect(0, 0, this.newCanvas.width, this.newCanvas.height);
      this.ctx.putImageData(this.pixels, 0, 0);
  }

  //add the brightness
  addBright() {
    this.light=1.1;
      //pixel opearation:
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
        this.pixels.data[i] = this.pixels.data[i] * this.light;
        this.pixels.data[i + 1] = this.pixels.data[i + 1] * this.light;
        this.pixels.data[i + 2] = this.pixels.data[i + 2] * this.light;
        //this.pixels.data[i + 3] = 255;
      }
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixels, 0, 0);
  }
  //reduce the brightness
  reduceBright() {
    this.light=0.9;
    //pixel opearation:
    for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
      this.pixels.data[i] = this.pixels.data[i] * this.light;
      this.pixels.data[i + 1] = this.pixels.data[i + 1] * this.light;
      this.pixels.data[i + 2] = this.pixels.data[i + 2] * this.light;
      //this.pixels.data[i + 3] = 255;
    }
    this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
    this.ctx.putImageData(this.pixels, 0, 0);
  }

  //  Adding green to the pixels
  Greenlight() {
    //pixel opearation:
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
        this.pixels.data[i] = this.pixels.data[i] * 0.95;
        this.pixels.data[i + 1] = this.pixels.data[i + 1] * 1.05;
        this.pixels.data[i + 2] = this.pixels.data[i + 2] * 0.95;
        //this.pixels.data[i + 3] = 255;
      }
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixels, 0, 0);

  }

  //  Adding red to the pixels
  Redlight() {
    //pixel opearation:
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
        this.pixels.data[i] = this.pixels.data[i] * 1.05;
        this.pixels.data[i + 1] = this.pixels.data[i + 1] * 0.95;
        this.pixels.data[i + 2] = this.pixels.data[i + 2] * 0.95;
        //this.pixels.data[i + 3] = 255;
      }
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixels, 0, 0);

  }

  //  Adding blue to the pixels
  Bluelight() {
      //pixel opearation:
      for (var i = 0, len = this.pixeldata.length; i < len; i += 4) {
        this.pixels.data[i] = this.pixels.data[i] * 0.95;
        this.pixels.data[i + 1] = this.pixels.data[i + 1] * 0.95;
        this.pixels.data[i + 2] = this.pixels.data[i + 2] * 1.05;
        //this.pixels.data[i + 3] = 255;
      }
      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixels, 0, 0);

  }

  //  reverese the image
  Reverse() {

      for (var i = 0, len = this.pixeldata.length ; i < this.pixeldata.length; i += 4, len -= 4) {
        this.pixels.data[i] = this.pixels.data[len] ;
        this.pixels.data[i + 1] = this.pixels.data[len + 1] ;
        this.pixels.data[i + 2] = this.pixels.data[len + 2] ;
        // this.pixels.data[- i ] = this.pixels.data[-len] ;
        // this.pixels.data[-i - 1] = this.pixels.data[-len - 1] ;
        // this.pixels.data[-i - 2] = this.pixels.data[-len - 2] ;
        // console.log(this.pixeldata.length)
      }
      // this.newCanvas.width = this.newImage.height;
      // this.newCanvas.height = this.newImage.width;

      this.ctx.clearRect(0, 0, this.newImage.width, this.newImage.height);
      this.ctx.putImageData(this.pixels, 0, 0);
      console.log("test")

  }


}
