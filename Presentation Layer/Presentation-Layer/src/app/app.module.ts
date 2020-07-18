import { UpdateOrderComponent } from './update-order/update-order.component';
import { orderfilterPipe } from './orders/order-filter.pipe';
import { cartfilterPipe } from './shopping-cart/cart-filter.pipe';
import { PlaceorderService } from './shared/placeorder.service';
import { ShoppingCartService } from './shared/shopping-cart.service';
import { RegistrationService } from './shared/registration.service';
import { LoginService } from './shared/login.service';
import { categoryfilterPipe } from './shop/category-filter.pipe';
import { productfilterPipe } from './shop/product-filter.pipe';


import { ProductsService } from './shared/products.service';
import { OrderService } from './shared/order.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { CategoryService } from './shared/category.service';
import { ProductComponent } from './product/product.component';
import { ShopComponent } from './shop/shop.component';
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { ThanksComponent } from './thanks/thanks.component';
import { Pipe, PipeTransform } from '@angular/core'; 

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    HomeComponent,
    AboutUsComponent,
    NavigationBarComponent,
    ContactUsComponent,
    ProductComponent,
    ShopComponent,
    CategoryComponent,
    productfilterPipe,
    cartfilterPipe,
    orderfilterPipe,
    categoryfilterPipe,
    AdminComponent,
    CreateUserComponent,
    LoginUserComponent,
    ShoppingCartComponent,
    PlaceorderComponent,
    UpdateCustomerComponent,
    UpdateOrderComponent,
    ThanksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [OrderService, CategoryService, ProductsService,LoginService, RegistrationService,
               ShoppingCartService, PlaceorderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
