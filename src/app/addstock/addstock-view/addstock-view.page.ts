import { NavigateDataService } from './../../services/navigate-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addstock-view',
  templateUrl: './addstock-view.page.html',
  styleUrls: ['./addstock-view.page.scss'],
})
export class AddstockViewPage implements OnInit {

  bought: any;

  constructor(
    private navData: NavigateDataService,
  ) { }

  ngOnInit() {
    this.bought = this.navData.getParamData();
    console.log('bought', this.bought);
  }

}
