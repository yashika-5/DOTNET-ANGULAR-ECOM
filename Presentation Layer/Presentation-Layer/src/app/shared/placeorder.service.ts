import { ShoppingCartService } from './shopping-cart.service';
import { Placeorder, ShoppingCart, OrderDetails } from './order.model';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpClientModule  } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlaceorderService {

  url : string = "http://localhost:53670/api/"

  constructor(private http : HttpClient,private shoppingCart: ShoppingCartService) { }

  //Get the data of customers
  ProductDescriptions():Observable<Placeorder[]>
  {
    return this.http.get<Placeorder[]>(this.url+'customers');
  }

  

  // DeleteOrderById(id : number):Observable<number>{
  //   let httpHeaders = new HttpHeaders()
  //   .set('Content-Type','application/json');
  //   let options = {
  //     headers:httpHeaders
  //   };
  //   return this.http.delete<number>(this.url+"shoppingCarts/"+id);
  // }

  //Get the customers Data by Id
  getOrderByID(id:number) {
    return this.http.get(this.url + 'customers/' + id);
  }

  //Update the Customers data 
  putOrder(formData : Placeorder){
    return this.http.put(this.url + 'customers/'+formData.userId,formData);
       
     }
    
  // Post the data to OrderDetails   
  postOrderDetails(formData: OrderDetails){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.url + "orderDetails" , formData);
  }

  //Get the Shopping Cart data
  OrderDescription():Observable<ShoppingCart[]>
    {
       return this.http.get<ShoppingCart[]>(this.url+'shoppingCarts');
    }
  }



