import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShareInfoClass } from '../models/ShareInfoClass';
import { User } from '../models/tempUsers';
import { Router } from '@angular/router';
import { ShareInfoService } from '../service/share-infoservice/share-info.service';
import { MessageService } from '../service/messageservice/message.service';
import { UsersService } from '../service/userservice/users.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-reset-pwd',

  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss']
})
export class OtpLoginComponent implements OnInit {


  @ViewChild('checkCode') canvasRef: ElementRef;
  shareInfoClass: ShareInfoClass = new ShareInfoClass;
  user: User = new User();
  Authentication: boolean = false;
  validation: boolean = false;
  codeSent: boolean = false;
  username: string
  code: string
  enteredCode: string


  /**
   *
   * @param router
   * @param shareInfoService
   */
  constructor(private router: Router, private shareInfoService: ShareInfoService,
    private messageService: MessageService, private userService: UsersService, private snackBar: MatSnackBar) {
  }


  /**
   * logout function
   * @constructor
   */

  LogOut() {
    this.Authentication = false;
  }

  ngOnInit() {

    // this.clickChange();
  }
  sendCode() {
    if (this.username == null || this.username == undefined) {
      // Display a snackbar when the input is invalid or missing 
      this.snackBar.open("Please enter the username.", "Dismiss", {duration:2000});
      return
    }
    // Genereate a random 4 digit code
    this.code = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    console.log('sending username :', this.username, 'and code:', this.code);
    this.messageService.setOTP(this.username, this.code).subscribe(result => {

      if (result !== null) {
        // OTP was set in database successfully. Now send the OTP to the user via Nexmo
        // Check if the user has a number registered in the database
        console.log(result);
        if (result.phoneNumber !== null) {
          this.messageService.sendOTP(result.phoneNumber, this.code, this.username).subscribe(res => {
            if (res !== null) {
              console.log('response received from nexmo:', res.messages[0].status);
              if (res.messages[0].status === '0') {
                this.codeSent = true;
                this.snackBar.open("Message Sent",null,{duration:1000})
              } else {
                this.snackBar.open("Number not in Nexmo's whitelist",null,{duration:2000})
              }
            } else {
              this.snackBar.open("Error sending the message", null, {duration:2000});
            }
          });
        } else {
          this.snackBar.open("No number found for this user",null,{duration:2000})
        }

      } else {
        this.snackBar.open("Message Sent",)
      }
    });
  }



  login() {
    if (this.enteredCode != null && this.enteredCode != undefined && this.username != null && this.username != undefined) {

      console.log("Entered code is", this.enteredCode);
      console.log(`Passing ${this.enteredCode} and ${this.username} to the backend`);

      this.userService.OtpLogin(this.username, this.enteredCode).subscribe(response => {

        console.log("response is", response.body)
        if (response !== null) {
          //share username and log in status

          this.user = response.user;
          this.shareInfoClass.userAccount = this.user.account;
          this.shareInfoClass.logIn = true;
          this.shareInfoClass.userName = this.user.userName;

          // save the username and token
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', this.user.userName);
          sessionStorage.setItem('user', this.user.userName);
          // share username and log in status
          this.shareInfoService.change.emit(this.shareInfoClass);

          this.router.navigate(['/pool']);
          this.Authentication = true;
        } else {
          this.snackBar.open("Invalid Password",null,{duration:1000})

        }
      });
    }
    else {
      this.snackBar.open("Invalid Input",null,{duration:1000})
    }

  }



  // }


}
