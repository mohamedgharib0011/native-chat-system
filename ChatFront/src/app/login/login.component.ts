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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  email: string = "";
  username: string = "";
  password: string = "";
  submitted = false;

  //, private gdata: GetdataService
  constructor(private formBuilder: FormBuilder, private loginSer: LoginService, private router: Router, private titleService: Title) {
    this.myForm = formBuilder.group({
      'email': ['', [Validators.required]],
      //'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });


    this.titleService.setTitle("Sign in");
  }

  onSubmit() {
    this.submitted = true;

    // read form values
    this.email = this.myForm.controls['email'].value;
    this.username = this.myForm.controls['username'].value;
    this.password = this.myForm.controls['password'].value;
   
    if (this.myForm.valid {
      this.onSuccess();
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

}
