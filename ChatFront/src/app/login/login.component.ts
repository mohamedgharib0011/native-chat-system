import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  MinLengthValidator
} from '@angular/forms';

import { LoginService } from '../Services/login/login.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  email: string = '';
  password: string = '';
  submitted = false;
  serverError = false;
  token: string;

  constructor(private formBuilder: FormBuilder, private loginSer: LoginService, private router: Router, private titleService: Title) {
    this.myForm = formBuilder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });

    this.titleService.setTitle('Sign in');

    // check if token exists
    this.token = localStorage.getItem('token');
    if (!this.isTokenExpired(this.token)) {
      console.log("not expired");
      this.onSuccess();
    }
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
          this.onSuccess();
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

  ngOnInit() {
  }

  onSuccess() {
    // Imperative Routing
    this.router.navigate(['/chat']);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {

    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

}
