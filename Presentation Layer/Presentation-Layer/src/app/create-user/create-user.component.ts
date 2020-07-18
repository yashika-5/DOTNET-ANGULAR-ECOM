import { Router } from '@angular/router';
import { Customer, Users } from './../shared/order.model';
import { RegistrationService } from './../shared/registration.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { promise } from 'protractor';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  data = false;      
  message:string; 
  createdUser:Users;
  customer:Customer;

  constructor(private registerService:RegistrationService, private route: Router) { }

  ngOnInit(): void {
  }

  //Method call on Form submission
  onSubmitForm(userform:NgForm)    
  {
    console.log(userform.value);
    this.createdUser = {
     userId : userform.value.userId,
     userPassword: userform.value.password,
      RoleId : 1,
    
    }
    // console.log("usernew",this.createdUser);
    this.customer={
      userId:userform.value.userId,  
      userName:userform.value.username,
      email:userform.value.email,
      phoneNo:userform.value.phoneno,
      address:userform.value.address,
      pincode:userform.value.pincode,
      
    }
    console.log(this.customer);
  
    this.CreateUser(this.createdUser);
    
     this.route.navigateByUrl('/login');

    alert("You are registered" + userform.value.username);

    userform.reset();
  }

  //Creating User
  CreateUser(user:Users)    
 {    
  this.registerService.Registration(user).subscribe(    
    (res)=>      
    {    
      console.log("INSIDE CREATE USER : ",res);
      this.data = true;    
      this.message = 'Data saved Successfully'; 
    }); 
    
     this.createCustomer(this.customer); 
  }
  
  //Creating the Customer
  createCustomer(customer:Customer)    
  {    
  this.registerService.RegistrationCustomer(customer).subscribe(    
    (res)=>    
    {    
      console.log("INSIDE CREATE CUSTOMER : ",res);
      this.data = true;    
      this.message = 'Data saved Successfully';    
      //  this.userform.reset();    
    });    
  }


}
