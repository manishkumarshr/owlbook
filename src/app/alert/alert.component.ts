import { AlertService } from './../services/alert.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';

interface Alert {
  type: string;
  message: string;
  disappear?: boolean;
  timeStamp?: number;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})

export class AlertComponent implements OnInit, AfterViewInit, OnDestroy {
  
  constructor(private alertService: AlertService) { }

  alerts: Alert[] = []; 
  private checkInterval;
  
  ngOnInit() {
    this.alertService.$event$.subscribe(alert => {
      this._showAlert(alert);
    })
  }

  ngAfterViewInit() {
    const timerObs$ = interval(1000);
    timerObs$.subscribe(d => {
      this.alerts.forEach((a, i) => {
        if (a.disappear && a.timeStamp &&   this._checkIfExpired(a.timeStamp)) {
          this.close(a);
        }
      })
    });
  }
  
  private _checkIfExpired(time: number) {
    return (Date.now() > time + 7000);
  }

  private _showAlert(alert: Alert) {
    if (alert) {      
      if (alert.disappear) {
        alert.timeStamp = Date.now();
      }
      this.alerts.push(alert);
    }
  }

  disappear() {
    return false;
  }

  close(a: Alert) {
    let index = this.alerts.indexOf(a);
    if (index > -1) {
      this.alerts.splice(index);
    }
  }

  ngOnDestroy() {
    clearInterval(this.checkInterval);
  }

}
