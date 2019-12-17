import { Component } from '@angular/core';
import { MarketStatusService } from './market-status.service';
import { Observable } from 'rxjs';
import { MarketPrice } from './market-price';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-socket-app';
  marketStatus: MarketPrice[];
  marketStatusToPlot: MarketPrice[];
  location: string;

  set MarketStatus(status: MarketPrice[]) {
    this.marketStatus = status;
    this.marketStatusToPlot = this.marketStatus;
  }

  constructor(private marketStatusSvc: MarketStatusService,
    private toastyConfig: ToastyConfig) {

    this.location = window.location.href;
    this.toastyConfig.theme = 'material';
    const userName = this.location.split("?")[1].split("=")[1];
    console.log('CURRENT USER >>>>', userName);


    this.marketStatusSvc.getInitialMarketStatus().subscribe(prices => {
      this.MarketStatus = prices;
      console.log('this.MarketStatus>>>>>>>>>>>>>>>', this.MarketStatus);

      // PULL UPDATED DATA
      const marketUpdateObservable = this.marketStatusSvc.getUpdates(userName);
      marketUpdateObservable.subscribe((latestStatus: MarketPrice) => {
        this.MarketStatus = [latestStatus].concat(this.marketStatus);
      });
    });
  }
}
