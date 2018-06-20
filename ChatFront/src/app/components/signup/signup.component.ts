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
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  myForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  email: string = '';
  username: string = '';
  password: string = '';
  language: string = 'en';
  submitted = false;
  serverError = false;
  token: string;

  //, private gdata: GetdataService
  constructor(private formBuilder: FormBuilder, private signupSer: SignupService, private router: Router) {
    this.myForm = formBuilder.group({
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'language': ['en']
    });

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
