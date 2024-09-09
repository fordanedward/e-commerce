import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ECommerceServiceService } from '../e-commerce-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  createAccountForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private ecs: ECommerceServiceService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.createAccountForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      middle_name: ['', Validators.required]
    });
  }

  onSubmit() {
    
    if (this.loginForm.valid) {

      this.ecs.login(this.loginForm.value).subscribe(data => {
        if(data.status.remarks === "success") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successfully",
            timer: 1500
          });
          localStorage.setItem('user_id', data.payload.id);
          localStorage.setItem('user_name', data.payload.name);
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/']);
        }
      })
    }
  }

  onCreateAccount() {
    if (this.createAccountForm.valid) {
      Swal.fire({
        icon: "success",
        title: "Account Created Successfully",
        timer: 1500
      });

      this.ecs.createAccount(this.createAccountForm.value).subscribe(data => {
        // this.router.navigate(['/asd']);
        this.createAccountForm.get('email')?.setValue('');
        this.createAccountForm.get('password')?.setValue('');
        this.createAccountForm.get('first_name')?.setValue('');
        this.createAccountForm.get('last_name')?.setValue('');
        this.createAccountForm.get('middle_name')?.setValue('');
      });
    }
  }

}
