import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShareInfoClass} from '../models/ShareInfoClass';
import {User} from '../models/users';
import {Router} from '@angular/router';
import {UsersService} from '../service/userservice/users.service';
import {ShareInfoService} from '../service/share-infoservice/share-info.service';
import {Mails} from '../models/mails';
import {MailserviceService} from '../service/mailservice/mailservice.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @ViewChild('checkCode') canvasRef: ElementRef;
  public code: any;
  InputCode:string;
  shareInfoClass: ShareInfoClass = new ShareInfoClass;
  user: User=new User();
  Authentication: boolean = false;
  validation:boolean=false;
  ConfirmPassword: string;
  mails:Mails=new Mails();

  /**
   *
   * @param router
   * @param userService
   * @param shareInfoService
   */
  constructor(private router : Router, private userService:UsersService, private shareInfoService:ShareInfoService, private mailService:MailserviceService) {
    this.user={
      userName:"",
      account:"",
      password:"",

    }
  }


  /**
   * logout function
   * @constructor
   */
  LogOut()
  {
    this.Authentication=false;
    this.user.account="";
    this.user.password="";
  }


  ngOnInit() {

   // this.clickChange();
  }
  private reset() {

    console.log(this.user.account);
    if (this.user.account === '') {
      alert('please input user');
      //this.createCode();
      return;
    } else if (this.user.password === '' || this.ConfirmPassword === '') {
      alert('please input password');
      //this.createCode();
      return;
    } else if(this.ConfirmPassword !== this.user.password) {
      alert('please input password');
      //this.createCode();
      return;
    }
    else if (this.InputCode.toLowerCase() !== this.code.toLowerCase()) {
      alert('invalid code');
      //this.createCode();
      return;
    }

    this.userService.reset(this.user.account, this.user.password).subscribe(result =>{

        //console.log(result)
        if( result !==null){
          //share username and log in status
          alert("Success")
          this.router.navigate(['/login']);
        }
        else{
          alert("Error");
        }
      });
  }


 // }


  /**
   * create random checkcode
   */
  public createCode() {
    if (this.user.account === '') {
      alert('please input user');
      return;
    }
    this.code = '';
    const codeLength = 6;  // code length
    const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 所有候选组成验证码的字符，当然也可以用中文的
    for (let i = 0; i < codeLength; i++) { // loop
      const index = Math.floor(Math.random() * 10); // generate random index（0~51）
      this.code += random[index]; // get according character and add into verifycode
    }
    this.mails.To=this.user.account;
    this.mails.title= "Verified Code"
    this.mails.content= "This is the verified code:" + this.code;
    this.mails.Action = 'verify';
    sessionStorage.setItem("user",this.user.account)
    console.log(this.mails.content);
    //console.log('1234'+this.header);
    this.mailService.SendMail(this.mails).subscribe((data)=>{
      console.log(data);
    });
    return this.code;
  }



  register(){
    this.router.navigate(['/reset']);
  }

}
