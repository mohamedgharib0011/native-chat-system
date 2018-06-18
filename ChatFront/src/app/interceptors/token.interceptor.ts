/*
 * @Author: mgharib 
 * @Date: 2018-06-19 01:04:17 
 * @Last Modified time: 2018-06-19 01:04:17 
 * 
 * for injecting the token for each request
 */


import { HttpInterceptor, HttpRequest, HttpResponse, HttpEvent, HttpHandler } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Boolean>> {
        console.log("************** token: "+this.auth.getToken());
        
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });
        return next.handle(req);
    }

}