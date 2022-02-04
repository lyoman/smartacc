import { NavigateDataService } from './../services/navigate-data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Http, HttpResponse } from '@capacitor-community/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sellstock',
  templateUrl: './sellstock.page.html',
  styleUrls: ['./sellstock.page.scss'],
})
export class SellstockPage implements OnInit {

  plt: string;
  localhost:string = '';
  loading: any;

  soldStock = [];

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
    private platform: Platform,
    public router: Router, 
    private apiService: ApiService,
    private alertController: AlertController,
    private navData: NavigateDataService
    ) {
    this.plt = this.platform.is('mobileweb') ? 'web' :
      this.platform.is('ios') ? 'ios' : 'android'
      this.localhost ="smartaccounting.pythonanywhere.com/api/"
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.loading = true;
    Http.request({ url: `https://${this.localhost}new_stock/sold_stock_user/?user=${JSON.parse(localStorage.getItem('user_id'))}`, method: 'GET' })
      .then(async response => {
        if (response.status === 200) {
          const data = await response.data;
          this.soldStock = data;
          console.log(this.soldStock);
          this.loading = false;
          this.changeStatus('get', 'unrestricted', 1);
        }
      })
      .catch(e => {
        console.log(e)
        this.loading = false;
        this.changeStatus('get', 'unrestricted', 2);
      })
  }

  changeStatus(type, restriction, status) {
    this[`${this.plt}_${type}_${restriction}`] = status
  }

  boughtDetail(news){
    this.navData.setParamData(news);
    this.router.navigateByUrl('/sellstock/sellstock-view');
  }


}
