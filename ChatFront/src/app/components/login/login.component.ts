import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  MinLengthValidator
} from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  myForm: FormGroup;
  email: string = '';
  password: string = '';
  submitted = false;
  serverError = false;
  token: string;

  constructor(private formBuilder: FormBuilder, private loginSer: LoginService, private router: Router) {
    this.myForm = formBuilder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });

  }

  onSubmit() {
    this.submitted = true;
    if (this.myForm.valid) {
      // read form values
      this.email = this.myForm.controls['email'].value;
      this.password = this.myForm.controls['password'].value;

      // save to database
      this.loginSer.authenticateUser(this.email, this.password).subscribe(res => {
        if (res['success']) {
          console.log(res['token']);
          // save token in Local Storage
          window.localStorage.setItem('token', res['token']);
          // redirect to chat
          this.router.navigate(['chat']);
        }
        else {
          // error happened
          this.serverError = true;
        }
      });
    }
    else {

    }
  }




}
