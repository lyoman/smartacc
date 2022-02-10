import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sellstock-new',
  templateUrl: './sellstock-new.page.html',
  styleUrls: ['./sellstock-new.page.scss'],
})
export class SellstockNewPage implements OnInit {

  user = { 
    date: new Date(),
    stockname: '',
    quantity: 0,
    amount: 0,
    description: '',
    quantity_left: '0',
    total_amount: 0,
    user: JSON.parse(localStorage.getItem('user_id'))
  };

  loading: any;

  userAddded = [];

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private navCtrl: NavController,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getResults1();
  }

  register() {
    if (this.user.stockname == "" || this.user.amount == 0 || this.user.quantity == 0) {
      this.presentAlert1();
    }
    else {
      this.loading = true;
      this.authService.register('new_stock/sold_stock/new/', this.user).subscribe((res) => {

        console.log(res);
        this.loading = false;
        this.navCtrl.navigateRoot('sellstock');

      }, (err) => {
        console.log(err);
        this.loading = false;
        this.presentAlert(err.message);
      });
    }
  }

  getResults1() {
    this.loading = true;
    this.apiService.getUsers1('/new_stock/new_stock/?user=' + JSON.parse(localStorage.getItem('user_id'))).subscribe(data => {
      this.loading = false;
      console.log('all added stock', data['results']);
      this.userAddded = data['results'];
    },
      err => {
        console.log(err)
        this.loading = false;
        this.presentAlert2(err.message);
      }
    );
  }

  presentAlert(err) {
    const alert = this.alertController.create({
    header: 'Authentication Error!',
    message: err,
    subHeader: 'Failed to Add stock',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }

  presentAlert2(err) {
    const alert = this.alertController.create({
    header: 'Network Error!',
    message: err,
    subHeader: 'Failed load current stock',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }

  presentAlert1() {
    const alert = this.alertController.create({
    header: 'Error!',
    message: 'Please fill in all fields in order to login',
    subHeader: 'Fill in all fields',
    buttons: ['Dismiss']}).then(alert=> alert.present());
  }

}
