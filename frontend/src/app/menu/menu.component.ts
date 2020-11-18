import {ShareInfoClass} from '../models/ShareInfoClass';
import {ShareInfoService} from '../service/share-infoservice/share-info.service';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ImagesInfo} from '../models/inmagesInfo';
import {ImagesService} from '../service/imageservice/images.service';
import {PreviewService} from '../service/previewservice/preview.service';


//   component has a selector , template , style and other properties, using which it specifies the metadata required to process the component
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  @ViewChild('userPhoto') userPhoto: ElementRef;
  shareInfoClass: ShareInfoClass = new ShareInfoClass;
  ImagesInfo: ImagesInfo = new ImagesInfo();

  logoutLink = '/';
  signAsLink = '/';
  status: String;

  /**
   *
   * @param router
   * @param shareInfoService
   */
  constructor(private router: Router, private shareInfoService: ShareInfoService, private imageService: ImagesService, private previewService: PreviewService,) {
    if (sessionStorage.getItem('user') === null) {
      this.status = 'Login';
    } else {
      this.status = sessionStorage.getItem('user');
    }
  }

  ngOnInit() {
    // Get the username from shareinfoService
    this.shareInfoService.change.subscribe(value => {

      this.status = value.userName;
    });


  }

  /**
   * logout function
   */
  logOut() {
    this.router.navigate(['/login']);
    this.shareInfoClass.logIn = false;
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.status = 'Login';

  }

  /**
   * jump to the firstpage
   */
  firstPage() {
    if (sessionStorage.getItem('user') !== null) {
      this.router.navigate(['/pool']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  /*
  * Add photo locally
   */
  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e: any) {
        this.ImagesInfo.localImg = e.target.result;
        console.log(this.ImagesInfo);
        this.previewService.getImg.emit(this.ImagesInfo);
      }.bind(this);
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    this.userPhoto.nativeElement.value = '';
    this.router.navigate(['preview']);
  }

}
