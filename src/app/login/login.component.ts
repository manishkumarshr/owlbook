import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    // if (this.userService.checkUserStatus()) {
    //   const timer$ = timer();
    //   timer$.subscribe(() => this.router.navigate(['/']));
    // }
  } 

  login(data: any, formObj: NgForm) {
    if(formObj.valid) {
      this.loginService.login(data.email, data.password);
    }    
  }

}
