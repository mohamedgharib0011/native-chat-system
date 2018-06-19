import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
//import { HttpHeaders } from '@angular/common/http';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'No key'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(public http: HttpClient) { }

  translate(value: string, src: string, target: string) {
    let params = new HttpParams();

    params = params.append('q', value);
    params = params.append('target', target);
    params = params.append('source', src);
    params = params.append('key', '');

    return this.http.get('https://translation.googleapis.com/language/translate/v2', { params: params });
  }
}
