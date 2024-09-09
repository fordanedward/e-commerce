import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ECommerceServiceService } from '../../e-commerce-service.service';
import { Cart } from '../e-commerce.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  @Input() cart_items: any;
  @Output() removedItem = new EventEmitter<any>();
  myForm: FormGroup;

  constructor(private ecs: ECommerceServiceService, private fb: FormBuilder) {
        // Initialize the form group
        this.myForm = this.fb.group({
          myInput: ['1'] 
        });
  }

  removeItemFromCart(item: any) {
    this.ecs.removeFromCart(item.id).subscribe(() => {
      this.removedItem.emit(this.cart_items)
    });
  }

  plusone(){
    let numberValue = parseInt(this.myForm.get('myInput')?.value)+1;
    console.log(numberValue)
    this.myForm.get('myInput')?.setValue(numberValue);

  }

  // Method to calculate the total price
  getTotalPrice(): number {
    return this.cart_items.reduce(
      (total: number, item: { quantity: number; price: number }) => total + (item.quantity * item.price),
      0
    );
  }

  checkout(totalPrice: number) {


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {

        let user_id = {
          user_id: JSON.parse(localStorage.getItem('user_id') || '{}'),
        };
        let order_date = { order_date: new Date() };
        let total_amount = { total_amount: totalPrice };
        let status = { status: "CHECKED_OUT" };
        let orders_obj = Object.assign({}, user_id, order_date, total_amount, status);
    
        this.ecs.addToOrder(orders_obj).subscribe( data => {
          let update_cart_to_checkedout_object = Object.assign({}, user_id, status);
          this.updatecurrentcart(update_cart_to_checkedout_object);
        } );

        Swal.fire({
          title: "Items Checked Out",
          text: "All your items has been checked out",
          icon: "success"
        });
      }
    });
  }

  updatecurrentcart(update_cart_to_checkedout_object : any){
    console.log(update_cart_to_checkedout_object);
    this.ecs.updateCartStatus(update_cart_to_checkedout_object).subscribe( data => {
      this.getCart();
    });
  }

  getCart(){
    this.ecs.getCart().subscribe(data => {
      this.cart_items = data.payload;
    })
  }
}
