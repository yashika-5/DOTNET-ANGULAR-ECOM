import { LoginService } from './../shared/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(public login:LoginService){}

  ngOnInit(): void {
    console.log(this.login.loggedIn)
  }

  
  //Setting the Flag to its original state and Empty the current User
  emptyCurrentUser(){
    this.login.currentUser = null;
    this.login.isAdmin = false;
  }
}
