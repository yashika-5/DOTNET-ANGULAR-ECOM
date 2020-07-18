import { Router } from '@angular/router';
import { Users } from './order.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import {HttpHeaders} from '@angular/common/http';  
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly Url :string;  
  token : string;  
  header : any; 
  AllUsers:Users[]=[];
  currentUser:Users ;
  flag=0;
  loggedIn = false;
  isAdmin = false; 
  constructor(private http : HttpClient, private route: Router) { 
    this.Url = 'http://localhost:53670/api/users';  
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings); 
  }

  //Method to Login the User
  Login(userId:number,password:string)
  { 
    console.log(userId, password);
    this.http.get<Users[]>(this.Url).subscribe(res=>{
      console.log(res); 
      this.AllUsers=res as Users[];
      // console.log("USERS ARRAY : "+JSON.stringify(this.AllUsers));

      console.log(this.AllUsers)   
      for (let user of this.AllUsers) {
        
        console.log(userId)
        console.log(password)
        if(user["userId"]==userId && user["userPassword"]==password)
        {
          if(user['roleId']==2){
            this.isAdmin =true;
          }
          this.currentUser = user;
          this.loggedIn=true;
          this.route.navigateByUrl('/home')
        alert('Login Successfully');
          break;

        }
        
      }
      if(!this.loggedIn)
      {alert('Login Unsuccessfully');}
      
    }) 
  }

}
