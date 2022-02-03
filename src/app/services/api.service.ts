import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import { Platform } from '@ionic/angular';
import { Http, HttpResponse } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // constructor() { }

  AUTH_SERVER_ADDRESS:  string  =  'https://smartaccounting.pythonanywhere.com/api/';

  plt: string;
  localhost:string = '';

  web_get_unrestricted = 0;
  web_post_unrestricted = 0;
  web_put_unrestricted = 0;
  web_delete_unrestricted = 0;

  android_get_unrestricted = 0;
  android_post_unrestricted = 0;
  android_put_unrestricted = 0;
  android_delete_unrestricted = 0;
  
  ios_get_unrestricted = 0;
  ios_post_unrestricted = 0;
  ios_put_unrestricted = 0;
  ios_delete_unrestricted = 0;
  // More variables for restricted API calls

  constructor(
    private httpClient: HttpClient,
    private platform: Platform,
    ) {
      this.plt = this.platform.is('mobileweb') ? 'web' :
      this.platform.is('ios') ? 'ios' : 'android'
      this.localhost ="smartaccounting.pythonanywhere.com/api/"
     }

  login(url, userData) {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}${url}`, userData, { headers: { 'Content-Type': 'application/json' } });
  }


  get(endpoint) {
    return Http.request({ url: `https://${this.localhost}${endpoint}`, method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then(async response => {
        if (response.status === 200) {
          const data = await response.data;
          console.log(data)
          this.changeStatus('get', 'unrestricted', 1);
        }
      })
      .catch(e => {
        console.log(e)
        this.changeStatus('get', 'unrestricted', 2);
      })
  }

  changeStatus(type, restriction, status) {
    this[`${this.plt}_${type}_${restriction}`] = status
  }
}
