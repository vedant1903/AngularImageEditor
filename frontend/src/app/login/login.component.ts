import {ShareInfoClass} from '../models/ShareInfoClass';
import {ShareInfoService} from '../service/share-infoservice/share-info.service';
import {Router} from '@angular/router';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {UsersService} from '../service/userservice/users.service';
import {User} from '../models/users';


//  component has a selector , template , style and other properties, using which it specifies the metadata required to process the component
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  @ViewChild('checkCode') canvasRef: ElementRef;
  public code: any;
  InputCode: string;
  shareInfoClass: ShareInfoClass = new ShareInfoClass;
  user: User = new User();
  Authentication: boolean = false;


  /**
   *
   * @param router
   * @param userService
   * @param shareInfoService
   */
  constructor(private router: Router, private userService: UsersService, private shareInfoService: ShareInfoService) {
    this.user = {
      userName: '',
      account: '',
      password: '',

    };
  }

  authenticate() {
    this.UsersLogin();

  }

  /**
   * logout function
   */
  LogOut() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user'); // remove seesion to logout
    this.Authentication = false;
    this.user.account = '';
    this.user.password = '';
  }


  ngOnInit() {
  }

  private UsersLogin() {

    console.log(this.user.account);
    // check the account,password and code
    if (this.user.account === '') {
      alert('please input user');
      return;
    } else if (this.user.password === '') {
      alert('please input password');
      return;
    }
    this.userService.Login(this.user.account, this.user.password).subscribe(response => {

        console.log(response);
        if (response.result === 'Unauthorized') {
          alert('Invalid password');
        } else if (response !== null) {
          //share username and log in status
          // When running app.js use the below code

          //when running server.js, uncomment the below line
          this.user = response.user;

          console.log(this.user.account);
          this.shareInfoClass.userAccount = this.user.account;
          this.shareInfoClass.logIn = true;
          this.shareInfoClass.userName = this.user.userName;
          localStorage.setItem('token', response.token);
          localStorage.setItem('user',this.user.userName);
          sessionStorage.setItem('user', this.user.userName);
          this.shareInfoService.change.emit(this.shareInfoClass);

          this.router.navigate(['/pool']);
          this.Authentication = true;

        } else {
          alert('Invalid password');
        }
      }
    );

  }



  register() {
    this.router.navigate(['/register']);
  }

  reset() {
    this.router.navigate(['/reset']);
  }


}
