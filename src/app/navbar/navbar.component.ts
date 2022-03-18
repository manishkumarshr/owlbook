import { NavigationService } from './../services/navigation.service';
import { LoginService } from './../services/login.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})

export class NavbarComponent implements OnInit {

  @Input() isLoggedIn: boolean;
  transactions: Array<any>;
  activeTab: string = 'dashboard';

  constructor(private loginService: LoginService,
    private navigationService: NavigationService) { 
    this.transactions = [
      {
        key: 'investment',
        label: 'Investment',
        roles: ['admin']
      },{
        key: 'expense',
        label: 'Expense',
        roles: ['admin']
      },{
        key: 'payment',
        label: 'Payment',
        roles: ['admin', 'manager']
      }
    ]
  }

  handleStaticNavigation(item: any) {
    this.activeTab = item.key;
    this.navigationService.handleStaticNavigation(item);
  }

  ngOnInit() {
  }

  logoutUser() {
    this.loginService.logout();
  }

}
