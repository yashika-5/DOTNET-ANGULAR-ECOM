import { Users, Customer } from './order.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import {HttpHeaders} from '@angular/common/http';  
import { from, Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  readonly usersUrl :string; 
  readonly customerUrl :string; 
  token : string;  
  header : any; 
  flag:boolean=false;


  constructor(private http : HttpClient) { 

    this.usersUrl = 'http://localhost:53670/api/users';
    this.customerUrl='http://localhost:53670/api/customers';  
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  
  }
  
  //Post the Data of User
  Registration(user:Users) 
  { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.http.post<Users[]>(this.usersUrl + '/Postuser/', user, httpOptions)  
     this.flag=true;
  } 

  //Post the Data of Customer
  RegistrationCustomer(customer:Customer) 
  { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.http.post<Customer[]>('http://localhost:53670/api/customers', customer);  
  }

  //Get the Customer by Id
  GetCustomerByUserId(userId: number){
    return this.http.get<Customer>('http://localhost:53670/api/customers/'+  userId);
  }
} 


