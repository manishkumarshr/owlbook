import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFireStore: AngularFirestore) { }

  private userLoggedInStatus: BehaviorSubject<any> = new BehaviorSubject(null);
  event$: Observable<any> = this.userLoggedInStatus.asObservable();
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  updateUserLoginStatus(loggedIn: boolean) {
    this.userLoggedInStatus.next(loggedIn);
  }

  getUserInfo(username: string) {
    return this.angularFireStore.collection('users', ref => ref.where('id', '==', username))
    .valueChanges().subscribe(record => {
      if(record && record.length) {
        this.currentUser.next(record[0]);
      }
    });    
  }

}
