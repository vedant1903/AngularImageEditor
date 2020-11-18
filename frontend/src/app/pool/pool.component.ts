import {Component, OnInit, ElementRef, ViewChild, SecurityContext, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {Images} from '../models/images';
import {ImagesService} from '../service/imageservice/images.service';
import {PreviewService} from '../service/previewservice/preview.service';
import {DomSanitizer} from '@angular/platform-browser';
import {LoadcloudimageService} from '../service/loadcloudimageservice/loadcloudingimage.service';
import {ImagesInfo} from '../models/inmagesInfo';
import {BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {
  @ViewChild('userPhoto') userPhoto: ElementRef;
  public images;
  width: Number;
  height: Number;
  ImagesInfo: ImagesInfo = new ImagesInfo();
  imageList = new Array();
  closeResult = '';
  modalRef: BsModalRef;


  /**
   *
   * @param imageService
   * @param previewService
   * @param router
   * @param sanitizer
   */
  constructor(
    private imageService: ImagesService,
    private previewService: PreviewService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService
  ) {
  }

  // necessary for showing image avoid unsafe error
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


  // show all  image on cloud server
  ngOnInit() {
    if(localStorage.getItem("token")==null || localStorage.getItem("token")==undefined){
      this.router.navigate(['login']);
    }
    this.imageList = new Array();
    // get the username from session
    this.imageService.RetrieveAllImage(sessionStorage.getItem('user')).subscribe(response => {
      this.images = response;
      console.log('The response from the images services: \n', this.images);
      for (let i = 0; i < this.images.length; i++) {

        this.imageList.push(this.images[i].img);
      }
      console.log('list is', this.imageList);
    });

    //console.log('123456');
    console.log(sessionStorage.getItem('user'));

  }


  /************** modal  *****************/
  open(template: TemplateRef<any>, $event) {

    this.modalRef = this.modalService.show(template);
    this.ImagesInfo.cloudImg = $event.target.src;
    console.log(this.ImagesInfo);

  }
  preview($event) {
    console.log(this.ImagesInfo);
    this.previewService.ImagesInfo = this.ImagesInfo;
    this.router.navigate(['preview']);
  }


  edit() {
    this.previewService.ImagesInfo = this.ImagesInfo;
  }

  delete() {
    let userName = localStorage.getItem('user');
    this.imageService.DeleteImage(this.ImagesInfo.cloudImg, userName).subscribe(value => {
      console.log(value);
    });
    //  set time out for deleting image
    setTimeout(() => {
        const index = this.imageList.indexOf(this.ImagesInfo.cloudImg);
        this.imageList.slice(index, 1);
        this.ngOnInit();
      },
      2000);


  }



}
