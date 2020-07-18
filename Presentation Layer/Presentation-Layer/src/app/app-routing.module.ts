import { UpdateOrderComponent } from './update-order/update-order.component';
import { ThanksComponent } from './thanks/thanks.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { ShoppingCartService } from './shared/shopping-cart.service';
import { PlaceorderService } from './shared/placeorder.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginService } from './shared/login.service';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ShopComponent } from './shop/shop.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';


const routes: Routes = [
  {path:"", redirectTo: "/home", pathMatch: "full"},
  {path : "home", component: HomeComponent},
  {path : "orders", component: OrdersComponent},
  {path : "about-us", component: AboutUsComponent},
  {path : "contact-us", component: ContactUsComponent},
  {path : "shop", component: ShopComponent},
  {path : "adminProduct", component: ProductComponent},
  {path : "adminCategory", component: CategoryComponent},
  {path : "admin", component: AdminComponent},
  {path : "login", component: LoginUserComponent},
  {path : "createUser", component: CreateUserComponent},
  {path : "cart", component: ShoppingCartComponent},
  {path: "updateCart/:id", component: UpdateOrderComponent},
  {path : "updateCustomer", component: UpdateCustomerComponent},
  {path: "thanks", component: ThanksComponent},
  {path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
