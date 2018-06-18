import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  MinLengthValidator
} from '@angular/forms';

import { SignupService } from '../Services/signup/signup.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  myForm: FormGroup;
  email: string = "";
  username: string = "";
  password: string = "";
  language: string = "English";
  submitted = false;

  //, private gdata: GetdataService
  constructor(private formBuilder: FormBuilder, private signupSer: SignupService, private router: Router, private titleService: Title) {
    this.myForm = formBuilder.group({
      'email': ['', [Validators.required]],
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'language': ["English"]
    });

    this.titleService.setTitle("Sign up");
  }

  onSubmit() {
    this.submitted = true;

    if (this.myForm.valid {
      // read form values
      this.email = this.myForm.controls['email'].value;
      this.username = this.myForm.controls['username'].value;
      this.password = this.myForm.controls['password'].value;
      this.language = this.myForm.controls['language'].value;

      // save to database
      // todo

      // redirect
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
