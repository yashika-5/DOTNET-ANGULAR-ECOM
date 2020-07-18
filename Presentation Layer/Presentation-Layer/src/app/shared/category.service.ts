import { Category } from './order.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';  

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  apiPreix : string   = "http://localhost:53670";

  //Get the Data of Category
  getCategory(): Observable<Category[]>
  {
    return this.httpClient.get<Category[]>(this.apiPreix + "/api/Category");
  }

  //Post the data to Category
  postCategory(category : Category) {
    return this.httpClient.post<Category>(this.apiPreix + "/api/Category/", category);
  }

  //Update the Data to Category
  putCategory(category : Category) { 
    return this.httpClient.put<Category>(this.apiPreix + "/api/Category/", category, httpOptions);
  }

  //Delete the Data of Category
  deleteCategory(categoryId : number){
    return this.httpClient.delete(this.apiPreix + "/api/Category/"+categoryId,{responseType :"text"});
  }
  


}
