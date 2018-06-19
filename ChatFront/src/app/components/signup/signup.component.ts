import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  MinLengthValidator
} from '@angular/forms';

//import { Observable } from 'rxjs';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  myForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  email: string = '';
  username: string = '';
  password: string = '';
  language: string = 'English';
  submitted = false;
  serverError = false;
  token: string;

  //, private gdata: GetdataService
  constructor(private formBuilder: FormBuilder, private signupSer: SignupService, private router: Router, private titleService: Title) {
    this.myForm = formBuilder.group({
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'language': ['English']
    });
    this.titleService.setTitle('Sign up');

    // check if token exists
    this.token = localStorage.getItem('token');
    if (!this.isTokenExpired(this.token)) {
      this.onSuccess();
    }
  }

  onSubmit() {
    this.submitted = true;
    this.serverError = false;

    if (this.myForm.valid) {
      // read form values
      this.email = this.myForm.controls['email'].value;
      this.username = this.myForm.controls['username'].value;
      this.password = this.myForm.controls['password'].value;
      this.language = this.myForm.controls['language'].value;

      // save to database
      this.signupSer.InsertUser(this.email, this.username, this.password, this.language).subscribe(res => {
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
