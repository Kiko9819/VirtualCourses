import { Component, OnInit } from '@angular/core';
import {User} from '@app/core/models/user';
import {AccountService} from '@app/core/services/account.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAll().pipe(
      take(1)
    ).subscribe(users => this.users = users);
  }

  deleteUser(id: number): void {
    this.accountService.delete(id).pipe(
      take(1)
    ).subscribe(() => {
      this.users = this.users.filter(user => +user.id !== id);
    });
  }

  blockUser(userId: number): void {
    this.accountService.update(userId, {isBlocked: true}).pipe(
      take(1)
    ).subscribe();
  }

  unblockUser(userId: number): void {
    this.accountService.update(userId, {isBlocked: false}).pipe(
      take(1)
    ).subscribe();
  }

}
