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

  ngOnInit(): void {
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
