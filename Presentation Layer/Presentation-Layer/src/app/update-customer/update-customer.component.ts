import { OrderDetails } from './../shared/order.model';
import { Observable } from 'rxjs';
import { ProductsService } from './../shared/products.service';
import { OrderService } from './../shared/order.service';
import { LoginService } from './../shared/login.service';
import { RegistrationService } from './../shared/registration.service';
import { PlaceorderService } from './../shared/placeorder.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopComponent } from '../shop/shop.component';
import { ShoppingCart } from '../shared/order.model';


@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  formDetail;
  abc;
  xyz:OrderDetails;
  selectedOrderid:number;
  newCart: Observable<ShoppingCart[]>;
  constructor( public service: PlaceorderService,
    private router: Router, 
    private route: ActivatedRoute,
    private registration : RegistrationService,
    private loginService: LoginService,
    private productService: ProductsService,
    private orderService: OrderService
    ) { }

  //Get customer by Id  
  ngOnInit(): void {
    this.formDetail={
      userId : null,
      userName :'',
      email :'',
      phoneNo :'',
      address :'',
      pincode:''
    }
    this.route.params.subscribe(params => {
      this.selectedOrderid=params['id'];
    });
       this.registration.GetCustomerByUserId(this.loginService.currentUser.userId).subscribe(
         res=>{
           this.formDetail=res;
           console.log(res);
          }); 
  }

  //Changing Customer details on submit customer form
  onSubmit(form:NgForm)
  {
     this.newCart= this.productService.getCartByUserId(this.loginService.currentUser.userId);
     console.log(this.newCart);
     this.newCart.forEach(element => {
       for (let index = 0; index < element.length; index++) {
         const xyz = element[index];
         this.abc={
          productId : xyz.productId,
          quantity : xyz.quantity,
          price :xyz.price,
          totalAmount : xyz.totalAmount,
          userId:xyz.userId       
        }
        console.log(this.abc);
        this.orderService.postOrderDetails(this.abc).subscribe(
          (response) =>{
            console.log(response);
            
          },
          (error) =>{
            console.log(error);
            alert("Order cannnot be placed please try again!!");
          }
        )
       }
       
     });
     this.router.navigate(['/thanks']);
    //this.deleteOrder(this.loginService.currentUser.userId);
    
  }
  // updateTotal()
  // {
  //   this.formDetail.totalAmount=parseFloat((this.formDetail.price*this.formDetail.quantity).toFixed(2));
  // }

 //Update the order 
  updateOrder(form: NgForm) {
    this.service.putOrder(form.value).subscribe(res => {
      this.resetForm(form);
    });
}
//Setting form values to null
resetForm(form?: NgForm) {
  if (form != null)
    form.resetForm();
  this.formDetail = {
    cartNo : null,
    userId :  null,
    productId :  null,
    quantity :  null,
    price :  null,
    totalAmount :  null
  }
}


}
