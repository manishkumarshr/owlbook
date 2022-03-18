import { AlertService } from './alert.service';
import { LoaderService } from './loader.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private anularFireAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private loaderService: LoaderService,
    private alertService: AlertService) { }

  login(username: string, password: string) {
    this.loaderService.pageLoadingCommand('show');

    // await 

    this.anularFireAuth.signInWithEmailAndPassword(username, password).then(response => {

      this.userService.getUserInfo(username);
      
      // sessionStorage.setItem('owlToken', response.user.uid);
      // sessionStorage.setItem('owlTokenEnc', window.btoa(response.user.uid));
      this.userService.updateUserLoginStatus(true);
      this.loaderService.pageLoadingCommand('hide');
      this.router.navigate(['/']);
    }).catch(err => {
      this.loaderService.pageLoadingCommand('hide');
      this.alertService.showAlert({
        type: 'danger',
        message: err.message || 'Something went wrong!',
        disappear: true
      })
    })
  }

  logout(): void {
    this.loaderService.pageLoadingCommand('show');
    this.anularFireAuth.signOut().then(() => {
      this.userService.updateUserLoginStatus(false);
      this.loaderService.pageLoadingCommand('hide');
      window.location.reload();
    }).catch((error) => {
      this.loaderService.pageLoadingCommand('hide');
      this.alertService.showAlert({
        type: 'danger',
        message: error.message || 'Something went wrong!',
        disappear: true
      })
      console.log(error);
    });
  }

}
