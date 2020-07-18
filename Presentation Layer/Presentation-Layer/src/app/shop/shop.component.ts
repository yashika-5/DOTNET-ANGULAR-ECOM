import { LoginService } from './../shared/login.service';
import { CategoryService } from './../shared/category.service';
import { ProductsService } from './../shared/products.service';
import { Products, Category } from './../shared/order.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../shared/shopping-cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  allProducts: Observable<Products[]>;
  allCategories: Observable<Category[]>;
  searchTerm: string;
  selectedCategory: string;
  constructor(private productService:ProductsService, private loggedIn: LoginService,
    private shoppingcartservice:ShoppingCartService,private categoryService: CategoryService) { }

  //call the Load data Funtion
  ngOnInit() {
    this.loadData();
  }

  //Load the Products And category data
  loadData(){
    this.allProducts = this.productService.getProducts();
    this.allCategories = this.categoryService.getCategory();
  }

  //Add product to cart by addTocart Method
  addToCart(product,quantity){
    product['quantity']= parseInt(quantity);
    product['totalAmount'] = product['quantity']*product['price'];
    product['userId'] = this.loggedIn.currentUser.userId;
    // this.shoppingcartservice.list.push(product);
    this.shoppingcartservice.postOrder(product).subscribe(
      (response) =>{
        alert("Product added to cart!!");
      },
      (error) =>{
        console.log(error);
        alert("Product cannot be added!!please try again.")
      });
    console.log(product,quantity)
  }

}
