import { ShoppingCart } from './order.model';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpClientModule  } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  url : string = "http://localhost:53670/api/";
list:ShoppingCart[];
  constructor(private http : HttpClient) {
    this.list=[];
   }

  //Getting the data of Shopping Cart 
  ProductDescriptions():Observable<ShoppingCart[]>
  {
    return this.http.get<ShoppingCart[]>(this.url+'shoppingCarts');
  }
 
  // Deleting the data of Shopping Cart using id
  DeleteOrderById(id : number):Observable<number>{
    let httpHeaders = new HttpHeaders()
    .set('Content-Type','application/json');
    let options = {
      headers:httpHeaders
    };
    return this.http.delete<number>(this.url+"shoppingCarts/"+id);
  }

  //Get OrderDetails by id
  getOrderByID(id:number) {
    return this.http.get(this.url + 'shoppingCarts/' + id);
  }

  //Put the Data to Shopping Cart Table
  putOrder(formData : ShoppingCart){
    return this.http.put(this.url + 'shoppingCarts/'+formData.cartNo,formData);
       
     }

  // post The data to Shopping Cart
  postOrder(formData: ShoppingCart){
    return this.http.post(this.url + 'shoppingCarts/'+formData.cartNo,formData);
  }
   }


