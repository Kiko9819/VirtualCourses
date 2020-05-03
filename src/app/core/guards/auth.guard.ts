import { Injectable } from '@angular/core';
import { Router, CanLoad, UrlSegment } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Route } from '@angular/compiler/src/core';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canLoad(route: Route, segments: UrlSegment[]): boolean {
        const user = this.accountService.userValue;
        if (user) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login']);
        return false;
    }
}