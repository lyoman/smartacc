import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/tebs',
      icon: 'home'
    },
    {
      title: 'Add Stock',
      url: '/help',
      icon: 'paper-plane'
    },
    {
      title: 'Sell Stock',
      url: '/help',
      icon: 'archive'
    },
    {
      title: 'Financial Summary',
      url: '/help',
      icon: 'book'
    },
    {
      title: 'Profile',
      url: '/help',
      icon: 'play'
    },
    {
      title: 'Contact',
      url: '/contactus',
      icon: 'call'
    },
    {
      title: 'About',
      url: '/aboutus',
      icon: 'information-circle'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  loggedIn = false;
  dark = false; 

  constructor(
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }


  logout() {
    localStorage.clear();
  }
}
