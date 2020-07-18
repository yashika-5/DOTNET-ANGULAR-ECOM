import { OrderDetails } from './../shared/order.model';
import { LoginService } from './../shared/login.service';
import { OrderService } from './../shared/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orderDetailList:OrderDetails[] ;
  loggedUser = false;
  searchTerm: any;

  constructor( public service: OrderService, public loginUser: LoginService ) { }

  //Subscribe the getOrderDetail Method to service
  ngOnInit(): void {
    
    this.service.getOrderDetails()
        .subscribe(data => this.orderDetailList=data);
    //console.log(this.orderDetailList);
     
    console.log(this.loginUser.currentUser)

    //Passing the current user Id to searchTerm variable 
    this.searchTerm = this.loginUser.currentUser.userId;
  }

}
