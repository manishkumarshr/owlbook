import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  private navHandler: BehaviorSubject<any> = new BehaviorSubject(null);
  navHandler$: Observable<any> = this.navHandler.asObservable();

  handleStaticNavigation(item: any) {
    this.navHandler.next(item);
  }

}
