import { ProductsService } from './../shared/products.service';
import { LoginService } from './../shared/login.service';
import { ShoppingCart } from './../shared/order.model';
import { ShoppingCartService } from './../shared/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {
  allOrders : Observable<ShoppingCart[]>;
  order:ShoppingCart[];
  constructor(public service:ShoppingCartService, private loginUser: LoginService, 
      private productService: ProductsService) { }
//Removing order from cart if order is placed for a specific user
  ngOnInit(): void {
    this.loadAllOrder();
this.allOrders.forEach(element => {
this.order=element;
for (let index = 0; index < this.order.length; index++) {
  let id = this.order[index].cartNo;
  console.log(id);
  this.service.DeleteOrderById(id).subscribe(() => {
    this.loadAllOrder();
  });
}
});
this.loadAllOrder();
}

//Load the Cart data by userId
loadAllOrder(){
  this.allOrders=this.productService.getCartByUserId(this.loginUser.currentUser.userId);
}
}

