import { NavigateDataService } from './../services/navigate-data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Http, HttpResponse } from '@capacitor-community/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.page.html',
  styleUrls: ['./financial-summary.page.scss'],
})
export class FinancialSummaryPage implements OnInit {

  loading: any;
  loading1: any;

  searchText;
  page = 1;
  pageSize = 15;

  userResults = [];

  totalStockOrdered: any;
  totalStockSold: any;

  profitloss: any;
  numberOfOrders: any;
  numberOfQuantity: any;

  totalAmountSold: any;
  totalQuantitySold: any;

  totalAmountBought: any;
  totalQuantityBought: any;

  bought = [];
  sold = [];

  plt: string;
  localhost:string = '';

  boughtStock = [];

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
    Http.request({ url: `https://${this.localhost}new_stock/new_stock/?user=${JSON.parse(localStorage.getItem('user_id'))}`, method: 'GET' })
      .then(async response => {
        if (response.status === 200) {
          const data = await response.data['results'];
          console.log('all added stock', data);

          this.bought = data;
          // data = data['results'];
          this.totalStockOrdered = data.length;
    
          const sumall = data.map(item => parseInt(item.amount)).reduce((prev, curr) => prev + curr, 0);
          console.log('amount bought',sumall);
    
          this.totalAmountBought = sumall;
    
    
          const sumall1 = data.map(item => parseInt(item.quantity)).reduce((prev, curr) => prev + curr, 0);
          console.log('quantity bought', sumall1);
    
          this.totalQuantityBought = sumall1;
          console.log(this.boughtStock);
          this.getSoldStock();
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

  getSoldStock() {
    this.loading = true;
    Http.request({ url: `https://${this.localhost}new_stock/sold_stock_user/?user=${JSON.parse(localStorage.getItem('user_id'))}`, method: 'GET' })
      .then(async response => {
        if (response.status === 200) {
          const data = await response.data;
          this.loading1 = false;
          console.log('user sold stock', data);
          this.sold = data;
    
          this.totalStockSold = data.length;
    
          const sumall = data.map(item => parseInt(item.amount)).reduce((prev, curr) => prev + curr, 0);
          console.log(sumall);
    
          this.totalAmountSold = sumall;
    
    
          const sumall1 = data.map(item => parseInt(item.quantity)).reduce((prev, curr) => prev + curr, 0);
          console.log(sumall1);
    
          this.totalQuantitySold = sumall1;
    
          this.profitloss = (this.totalAmountSold - this.totalAmountBought);
          console.log("this.profitloss", this.profitloss);
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

}
