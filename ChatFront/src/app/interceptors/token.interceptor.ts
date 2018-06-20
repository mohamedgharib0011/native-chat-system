/*
 * @Author: mgharib 
 * @Date: 2018-06-19 01:04:17 
 * @Last Modified time: 2018-06-19 01:04:17 
 * 
 * for injecting the token for each request, reference:
 * https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
 * 
 */


import { HttpInterceptor, HttpRequest, HttpResponse, HttpEvent, HttpHandler } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Boolean>> {
        let request;
        if (req.url.indexOf('translation.googleapis.com') > -1) {
            request = req;
        } else {
            request = req.clone({
                setHeaders: {
                    Authorization: ` Bearer ${this.auth.getToken()}`
                }
            });
        }
        
        return next.handle(request);
    }

}