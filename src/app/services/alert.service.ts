import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

interface Alert {
  type: string;
  message: string;
  disappear?: boolean;
  timestamp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  private displayAlert: BehaviorSubject<Alert> = new BehaviorSubject(null);
  $event$: Observable<any> = this.displayAlert.asObservable();

  showAlert(alert: Alert) {
    this.displayAlert.next(alert);
  }

}
