/*
 * @Author: mgharib 
 * @Date: 2018-06-19 14:00:00 
 * @Last Modified time: 2018-06-19 14:00:00 
 * Common authentication methods
 */

import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * @author mgharib
   * Used for fetching the token from localstorage
   */
  public getToken(): string {
    return localStorage.getItem('token');
  }

  /**
    * @author mgharib
    * Used for decoding the user information stored in token payload
    */
  public getUserInfo(): String {
    const token = this.getToken();
    if (token) {
      return jwt_decode(token);

    }
    return null;
  }


  isAuthenticated() {
    const token = this.getToken();
    if (!token)
      return false;
    if (this.isTokenExpired(token)) {
      localStorage.removeItem('token');
      return false;
    }

    return true;

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
