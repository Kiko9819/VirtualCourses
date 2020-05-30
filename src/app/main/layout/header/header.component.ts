import { Component, OnInit } from '@angular/core';
import {AccountService} from '@app/core/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navbarOpen: boolean;
  profileOpen: boolean;

  constructor(private accountService: AccountService) { }

  get loggedInUserName(): string {
    if (this.accountService.userValue) {
      return this.accountService.userValue.firstName;
    }
  }

  ngOnInit(): void {
  }

  hasAdminRights(): boolean {
    return this.accountService.userValue && this.accountService.isAdmin();
  }

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

  toggleProfileDropdown(): void {
    this.profileOpen = !this.profileOpen;
  }

  logout(): void {
    this.accountService.logout();
  }

}
