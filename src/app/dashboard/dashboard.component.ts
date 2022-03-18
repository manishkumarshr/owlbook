import { UserService } from './../services/user.service';
import { NavigationService } from './../services/navigation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  
  displaySection: string = 'dashboard';
  currentUser: any = {};

  constructor(private navigationService: NavigationService,
    private userService: UserService) { }
  
  ngOnInit() {
    this.navigationService.navHandler$.subscribe(data => {
      if (data && data.hasOwnProperty('key')) {
        this.displaySection = data.key;
      }
    });

    this.userService.updateUserLoginStatus(true);

    this.userService.currentUser.subscribe(res => {
      if(res) {
        console.log(res);
        this.currentUser = res;
      }
    })
  }

}
