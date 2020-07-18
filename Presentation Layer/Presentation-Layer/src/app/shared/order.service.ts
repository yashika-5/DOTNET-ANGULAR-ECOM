import { Order, OrderDetails } from './order.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formDataList: OrderDetails[]  ;
  public _url = 'http://localhost:53670/api' 

  constructor(private http : HttpClient) { }

  // refreshList(){
  //   this.http.get(this._url + '/Orders')
  //   .toPromise().then(res => this.formDataList = res as OrderDetails[]);
  // }

  //Get Method to receive the Order Details
  getOrderDetails() : Observable<OrderDetails[]>{
    return this.http.get<OrderDetails[]>(this._url + '/orderDetail'); 
  }

  //Post Method to post the Order Details
  postOrderDetails(data : OrderDetails) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<OrderDetails>(this._url + "/orderDetail", data);
  }
}
