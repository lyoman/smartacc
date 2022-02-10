import { AuthService } from './../../services/auth.service';
import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addstock-new',
  templateUrl: './addstock-new.page.html',
  styleUrls: ['./addstock-new.page.scss'],
})
export class AddstockNewPage implements OnInit {

  user = { 
    name: '', 
    amount: 0,
    quantity: 0,
    description: '',
    user: JSON.parse(localStorage.getItem('user_id')),
    date: new Date()
  };

  loading: any;

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }


  register() {
    if (this.user.name == "" || this.user.amount == 0 || this.user.quantity == 0) {
      this.presentAlert1();
    }
    else {
      this.loading = true;
      this.authService.register('/new_stock/new_stock/new/', this.user).subscribe((res) => {

        console.log(res);
        this.loading = false;
        this.navCtrl.navigateRoot('addstock');

      }, (err) => {
        console.log(err);
        this.loading = false;
        this.presentAlert(err.message);
      });
    }
  }

  presentAlert(err) {
    const alert = this.alertController.create({
    header: 'Authentication Error!',
    message: err,
    subHeader: 'Failed to Add stock',
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
