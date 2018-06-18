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

export class LoginService {
  constructor(public http: HttpClient) {
  }

  authenticateUser(email: string, password: string) {
    return this.http.post("http://localhost:3000/authenticate",
      { 'email': email, 'password': password },
      httpOptions);
  }
  
}
