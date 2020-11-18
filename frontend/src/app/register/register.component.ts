import { UsersService } from '../service/userservice/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { User } from '../models/users';
import {User} from '../models/tempUsers';
//  component has a selector , template , style and other properties, using which it specifies the metadata required to process the component
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  account: string;
  password: string;
  rePassword: string;
  pattern:any=/^[0-9A-Za-z]+(\.[a-zA-Z0-9_-]+)*@[0-9A-Za-z_]+(\.[a-zA-Z0-9_-]+)+$/g;
  /**
   *
   * @param router
   * @param userService
   */
  constructor(private router:Router, private userService:UsersService) { }

  ngOnInit() {
  }

  onLoadPool(){
    this.router.navigate(['/']);
  }
  //register acoount function
  register()
  {
    console.log(this.user.userName);
    if(this.account == null){
      alert("don't leave account it blank");
    }
    else if(!this.account.match(this.pattern)){
      alert("Please enter valid email account");
    }
    else if(this.user.userName == null){
      alert("don't leave userName it blank");
    }
    else if(this.password != null && this.password == this.rePassword){
      console.log("password match");
      this.user.account = this.account;
      this.user.password = this.password;
      this.userService.Register(this.user).subscribe(()=>
      {

      });
      this.router.navigate(['/']);
    }
    else{
      alert("invalid password");
    }

  }
}
