import { Router, CanActivate } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NonAuthenticatedGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService){}

    canActivate(): boolean {
        const hasToken = this.accountService.userValue.token;

        if (!hasToken) {
            this.router.navigate(['/']);

            return false;
        }

        return true;
    }
}
