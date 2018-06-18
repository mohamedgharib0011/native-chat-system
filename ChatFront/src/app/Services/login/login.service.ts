import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(public http: HttpClient) {
  }

  InsertUser(email: string, username: string, password, string) {
    return this.http.get("url here");
  }

}
