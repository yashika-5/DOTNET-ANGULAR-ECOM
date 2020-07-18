import { Products, ShoppingCart } from './order.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //url to web api
  url = "http://localhost:53670/api/products";
  
  constructor(private httpClient: HttpClient) { }

  //getProducts service call to receive all the products details from api
  getProducts():Observable<Products[]>{
    return this.httpClient.get<Products[]>(this.url + '/AllProducts');
  }

  //getProductById method to receive a particular product details based on product id
  getProductById(productId: number):Observable<Products>{
    return this.httpClient.get<Products>(this.url + '/GetProductById/' + productId);
  }

  //getCartByUser method to filter cart data according to a particular user
  getCartByUserId(userId: number):Observable<ShoppingCart[]>{
    return this.httpClient.get<ShoppingCart[]>(this.url + '/GetCartByUserId/' + userId);
  }

  //addProduct method to add a new product details in database
  addProduct(newProduct: Products):Observable<Products>{
    //httpheaders to send request and receive response from web api
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    return this.httpClient.post<Products>(this.url + '/AddProduct/', newProduct,httpOptions);
  }

  //updateProduct method to update product details in database 
  updateProduct(newProduct: Products):Observable<Products>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    return this.httpClient.put<Products>(this.url + '/UpdateProduct/', newProduct,httpOptions);
  }

  //deleteProduct method to delete a producut from database based on product id
  deleteProduct(productId: number){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/text'}) }; 
    return this.httpClient.delete<number>(this.url + '/DeleteProduct/'+ productId,httpOptions);
  }
  

}

