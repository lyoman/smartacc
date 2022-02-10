import { NavigateDataService } from './../services/navigate-data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Http, HttpResponse } from '@capacitor-community/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-addstock',
  templateUrl: './addstock.page.html',
  styleUrls: ['./addstock.page.scss'],
})
export class AddstockPage implements OnInit {

  plt: string;
  localhost:string = '';
  loading: any;

  boughtStock = [];

  constructor(
    private platform: Platform,
    public router: Router, 
    private apiService: ApiService,
    private alertController: AlertController,
    private navData: NavigateDataService
    ) {

  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.loading = true;
    this.apiService.getUsers1("new_stock/new_stock/").subscribe (data => {
      console.log("data", data["results"]);
      this.boughtStock = data["results"];
      this.loading = false;
      console.log(this.boughtStock);
    }, (err) => {
      console.log(err);
      this.loading = false;
      this.presentAlert(err.message);
    });
  }

  boughtDetail(news){
    this.navData.setParamData(news);
    this.router.navigateByUrl('/addstock/addstock-view/'+news.id);
  }


  presentAlert(err) {
    const alert = this.alertController.create({
    header: 'Unable to retrive data!',
    message: err,
    subHeader: 'Network error, pliz try again',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }

}
