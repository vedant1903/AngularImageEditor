import { Component, OnInit, OnDestroy,ViewChild,ElementRef } from "@angular/core";
import { PreviewService } from "../service/previewservice/preview.service";
import { ImagesInfo } from "../models/inmagesInfo";
import { LoadcloudimageService } from "../service/loadcloudimageservice/loadcloudingimage.service";
import { Subscription } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {ImagesService} from '../service/imageservice/images.service';


//  component has a selector , template , style and other properties, using which it specifies the metadata required to process the component
@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"]
})

export class PreviewComponent implements OnInit, OnDestroy {


  ImagesInfo: ImagesInfo = new ImagesInfo();


  private paramsSubscription: Subscription;
  Img: any;
  @ViewChild("Mycanvas") Mycanvas: ElementRef;
  private context: HTMLCanvasElement;

  /**
   *
   * @param previewService
   * @param sanitizer
   */
  constructor(private previewService: PreviewService,
              private sanitizer: DomSanitizer,
              private imageService: ImagesService,
              private router: Router,
              private http: HttpClient) {
  }

  // Predefined method in a TypeScript class which is called when the class is instantiated
  ngOnInit() {
    if(localStorage.getItem("token")==null || localStorage.getItem("token")==undefined){
      this.router.navigate(['login']);
    }
    this.ImagesInfo=this.previewService.ImagesInfo;
    this.paramsSubscription = this.previewService.getImg.subscribe(data => {
      this.ImagesInfo = data;
    });
    console.log(this.ImagesInfo);
  }


  //  Start edit and go to edit component
  edit()
  {
      this.previewService.ImagesInfo = this.ImagesInfo;
  }

  // A lifecycle hook that is called when a directive, pipe, or service is destroyed. Use for any custom cleanup that needs to occur when the instance is destroyed.
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  //  For security image URL
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  delete() {
      let uName = localStorage.getItem("user");
      this.imageService.DeleteImage(this.ImagesInfo.cloudImg, uName).subscribe(value => {
        console.log(value)
      });
    this.router.navigate(['pool']);  }
}
