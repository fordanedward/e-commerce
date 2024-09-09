import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { ProductsComponent } from './e-commerce/products/products.component';
import { OrdersComponent } from './e-commerce/orders/orders.component';
import { CartComponent } from './e-commerce/cart/cart.component';
import { ECommerceServiceService } from './e-commerce-service.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ECommerceComponent,
    ProductsComponent,
    OrdersComponent,
    CartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ECommerceServiceService,provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
