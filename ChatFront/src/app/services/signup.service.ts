import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'No key'
  })
};

@Injectable({
  providedIn: 'root'
})

export class SignupService {

  constructor(public http: HttpClient) { }

  InsertUser(email: string, username: string, password: string, language: string) {
    return this.http.post("http://localhost:3000/signup",
      { 'email': email, 'name': username, 'password': password, 'pref_lang': language },
      httpOptions);
  }
}
