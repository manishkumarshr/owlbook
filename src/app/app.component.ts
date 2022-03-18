import { LoaderService } from './services/loader.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'owlbook';
  isUserLoggedIn: boolean = false;
  isLoading: boolean;
  constructor(private userService: UserService,
    private router: Router,
    private loaderService: LoaderService) { }
  
  ngOnInit() {
    this.isLoading = false;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd) {
        this.isLoading = false;
      }
    });

    this.userService.event$.subscribe(status => {
      if (status !== null) {
        this.isUserLoggedIn = status;
      }
    });

    this.loaderService.event$.subscribe(command => {
      if (command === 'show') {
        this.isLoading = true;
      } else if (command === 'hide') {
        this.isLoading = false;
      }
    });

  }  

}
