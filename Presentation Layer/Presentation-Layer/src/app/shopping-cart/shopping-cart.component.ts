import { LoginService } from './../shared/login.service';
import { ShoppingCart } from './../shared/order.model';
import { ShoppingCartService } from './../shared/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  searchTerm: any;
  constructor(private formbulider: FormBuilder, private service: ShoppingCartService,private router: Router, 
    private route: ActivatedRoute, private loginService: LoginService) { }
  dataSaved = false;
  
  optionValue : string;
  orderForm: FormGroup;
  allDetails: Observable<ShoppingCart[]>;
  documentIdUpdate = null;
  message = null;
  ngOnInit(): void {
    this.orderForm = this.formbulider.group({
      quantity: [null],
      userId:[null],
      productId:[null],
      price:[null],
      totalAmount:[null]
    });
   
    this.searchTerm = this.loginService.currentUser.userId;
    this.loadAllOrder();
  }

  //Getting Cart details using ProductDescription method from service 
  loadAllOrder()
  {
    this.allDetails = this.service.ProductDescriptions();
  }
//Deleting data by product id if not required
  deleteOrder(id: number) {
    if (confirm("Are you sure you want to delete this ?")) {  
    this.service.DeleteOrderById(id).subscribe(() => {
      this.dataSaved = true;
      this.message = 'Record Deleted Successfully';
      this.loadAllOrder();
      this.documentIdUpdate = null;
    });
  }
}
//Navigating to update customer component
checkOut()
{
  this.router.navigate(['/updateCustomer']);
}

//Navigating to updateCart
EditOrderItems(cartNo: number){
  this.router.navigate(['/updateCart',cartNo]);
}

}


