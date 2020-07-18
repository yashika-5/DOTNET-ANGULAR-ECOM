import { LoginService } from './../shared/login.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  userId:number;
  password:string;
  

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  //Passing the userID and password 
  onSubmitForm(userform:NgForm)    
  {
    this.userId=userform.value.userId;
    this.password=userform.value.password;

    this.loginService.Login(this.userId,this.password);

  }

}
