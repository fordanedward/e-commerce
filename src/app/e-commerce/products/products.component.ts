import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ECommerceServiceService } from '../../e-commerce-service.service';
import { Cart } from '../e-commerce.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  @Input() products: any;
  @Output() addedItemToCart = new EventEmitter<any>();
  @Input() cart: Cart[] = [];
  

  constructor(private ecs: ECommerceServiceService) {}

  // addToCart()
  // Define a FormGroup with a single FormControl
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  
  addToCart(selectedProduct: any) {
    let user_id = {
      user_id: JSON.parse(localStorage.getItem('user_id') || '{}'),
    };
    let product_id = { product_id: selectedProduct };
    let status = { status: 'IN_CART' };
    let quantity = { quantity: 1 };
    let cartObj = Object.assign({}, null, product_id, user_id, status, quantity);

    const itemExist = this.cart.find(
      (item) =>
        item.product_id == selectedProduct &&
        item.status === 'IN_CART' &&
        item.user_id === JSON.parse(localStorage.getItem('user_id') || '{}')
    );

    const exists = itemExist !== undefined;
    if(!exists) {
      this.ecs.addToCart(cartObj).subscribe((product) => {
        this.addedItemToCart.emit(this.cart);
        Swal.fire({
          title: "Added!",
          text: "Item added in your cart",
          icon: "success"
        });
      });       
    } else {
      Swal.fire({
        icon: "error",
        title: "Whoops!",
        text: "Item already in your cart",
      });
    }
  }
}
