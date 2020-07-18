import { Observable } from 'rxjs';
import { ShoppingCart } from './../shared/order.model';
import { ShoppingCartService } from './../shared/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {

  formDetail;
  selectedOrderid:number;
  allDetails: Observable<ShoppingCart[]>;
  
  constructor(
    public service: ShoppingCartService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  //
  ngOnInit(): void {
    this.formDetail={
      CartNo :null,
    UserId :null,
    ProductId :null,
         Quantity :null,
         TotalAmount :null
    }
    this.route.params.subscribe(params => {
      this.selectedOrderid=params['id'];
    });
       this.service.getOrderByID(this.selectedOrderid).subscribe(res=>this.formDetail=res); 
  }
  onSubmit(form:NgForm)
  {
    //this.updateTotal();
    this.updateOrder(form);
    this.router.navigate(['/cart']);
  }
  updateTotal()
  {
    if(this.formDetail.quantity <= 0)
    {
      this.formDetail.totalAmount = 0;
    }
    else{
      this.formDetail.totalAmount=parseFloat((this.formDetail.price*this.formDetail.quantity).toFixed(2));
    }
    
  }
 
  loadAllOrder()
  {
    this.allDetails = this.service.ProductDescriptions();
  }

  updateOrder(form: NgForm) {
    this.service.putOrder(form.value).subscribe(res => {
      //this.loadAllOrder();
      this.resetForm(form);
    });
}
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
