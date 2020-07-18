import { LoginService } from './../shared/login.service';
import { Placeorder } from './../shared/order.model';
import { PlaceorderService } from './../shared/placeorder.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent implements OnInit {

  constructor(private service: PlaceorderService,private router: Router, 
    private route: ActivatedRoute,
    private formbulider: FormBuilder,
    private loginUser: LoginService) {}

  dataSaved = false;
  
  optionValue : string;
  orderForm: FormGroup;
  allDetails: Observable<Placeorder[]>;

  documentIdUpdate = null;
  message = null;
  ngOnInit(): void {
    this.orderForm = this.formbulider.group({
      userId : [],
      userName :['', [Validators.required, Validators.minLength(3), Validators.pattern]],
      email : ['', [Validators.required, Validators.pattern]],
      phoneNo :['', [Validators.required, Validators.pattern]],
      address :['', [Validators.required]],
      pincode:['', [Validators.required, Validators.pattern]],
    });
   

    this.loadAllOrder();
  }
//loading customer detail from database
 loadAllOrder()
  {
    this.allDetails = this.service.ProductDescriptions();
  }

EditOrderItems(userId: number){
  this.router.navigate(['/change/'+userId]);
}
//Navigating to final thanks  component
PlaceOrder()
{
  this.router.navigate(['/thanks']);
}

// deleteOrder(id: number) {
  
//   this.service.DeleteOrderById(this.loginUser.currentUser.userId).subscribe(() => {
//     this.dataSaved = true; 
//     this.loadAllOrder();
//     this.documentIdUpdate = null;
//   });

// }
}

