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
    if(JSON.parse(localStorage.getItem("token")) != null) {
      this.router.navigateByUrl('/home');
    }
  }

  login() {
    if (this.user.username == "" || this.user.password == "") {
      this.presentAlert1();
    }
    else {
      this.loading = true;
      this.authService.login('auth/token/', this.user).subscribe((res) => {

        this.token = jwt_decode(res.token);

        console.log("this.token",  this.token);
        localStorage.setItem('token', JSON.stringify(this.token));
        localStorage.setItem('user_id', JSON.stringify(this.token['user_id']));
        localStorage.setItem('username', JSON.stringify(this.token['username']));
        localStorage.setItem('email', JSON.stringify(this.token['email']));

        localStorage.setItem('loggedIn', 'true');
        console.log(res);
        this.loading = false;
        this.navCtrl.navigateRoot('home');

      }, (err) => {
        console.log(err);
        this.error = err;
        this.loading = false;
        this.presentAlert(err.message);
      });
    }
  }

  register() {
    this.router.navigateByUrl('/register');
  }

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
