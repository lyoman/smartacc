import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
// import * as jwt_decode from "jwt-decode";
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = { username: '', password: ''};

  loading: any;
  token: any;

  who = "";
  error: any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  guest() {
    this.router.navigateByUrl('/guardian');
  }

  login1() {
    this.router.navigateByUrl('/home');
  }

  login() {
    if (this.user.username == "" || this.user.password == "") {
      this.presentAlert1();
    }
    else {
      // this.loading.presentLoading();
      this.loading = true;
      this.authService.login('token/', this.user).subscribe((res) => {
        // localStorage.setItem('token', res.access_token);
        // console.log("decoded token", jwt_decode(res.access_token));
        this.token = jwt_decode(res.token);

        console.log(" this.token",  this.token);

        localStorage.setItem('user_id', JSON.stringify(this.token['user_id']));
        localStorage.setItem('username', JSON.stringify(this.token['username']));
        localStorage.setItem('email', JSON.stringify(this.token['email']));
        // var token = "eyJ0eXAiO.../// jwt token";
// var decoded = jwt_decode(token);
        localStorage.setItem('loggedIn', 'true');
        console.log(res);
        this.loading = false;
        if(this.who == 'user') {
          this.navCtrl.navigateRoot('home');
        } else {
          this.navCtrl.navigateRoot('tebs');
        }
      }, (err) => {
        console.log(err);
        this.error = err;
        // this.loading.dismiss();
        this.loading = false;
        this.presentAlert(err.message);
      });
    }
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  // presentAlert2() {
  //   const alert = this.alertController.create({
  //   header: 'Notice',
  //   message: 'To register, visit the website',
  //   subHeader: 'website link http://blindstick.herokuapp.com/register',
  //   buttons: ['Dismiss']}).then(alert=> alert.present());
  // }

  presentAlert(err) {
    const alert = this.alertController.create({
    header: 'Authentication Error!',
    message: err,
    subHeader: 'Failed to Login',
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
