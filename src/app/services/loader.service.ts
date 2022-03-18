import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private pageLoading: BehaviorSubject<any> = new BehaviorSubject('show');
  event$: Observable<any> = this.pageLoading.asObservable();

  pageLoadingCommand(command: string) {
    this.pageLoading.next(command);
  }

}
