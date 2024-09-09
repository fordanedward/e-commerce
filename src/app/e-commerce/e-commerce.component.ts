import { Component, OnInit } from '@angular/core';
import { ECommerceServiceService } from '../e-commerce-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrl: './e-commerce.component.scss'
})
export class ECommerceComponent implements OnInit{


  items: any[] = [];
  payload: any;
  
  cart: Cart[] = [];

  constructor(private ecs: ECommerceServiceService, private router: Router) { }

  ngOnInit(): void {

    const user = localStorage.getItem('user_id');

    this.ecs.getProducts().subscribe(data => {
      this.items = data.payload;
    });

    this.getCart();
  }

  getCart(){
    this.ecs.getCart().subscribe(data => {
      this.cart = data.payload;
    })
  }

  refreshCart(newCart: Cart[]) {
    // this.cart.push(newCart);
    this.cart = newCart;
    this.getCart();
  }

  logout(){
    this.ecs.logout().subscribe(data => {
    //you can also clear session data
    sessionStorage.clear();

    // Redirect to login page or another page
    this.router.navigate(['/login']);
    })
  }

}

export interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}


export interface ApiResponse {
  payload: any[];
}

export interface Cart {
  id: number;
  user_id: number;
  product_id: number;
  status: string;
}

