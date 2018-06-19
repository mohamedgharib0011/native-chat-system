/*
 * @Author: mgharib 
 * @Date: 2018-06-19 14:00:00 
 * @Last Modified time: 2018-06-19 14:00:00 
 * Common authentication methods
 */

import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

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

}
