import { CanLoad, UrlSegment, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AccountService } from '../services/account.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanLoad {
    constructor(private router: Router, 
        private accountService: AccountService){}

    canLoad(route: Route, segments: UrlSegment[]): boolean {
        return this.check();
    }

    private check(): boolean {
        if(true || !this.accountService.userValue.roles.includes('admin')) {
            this.router.navigate(['/home']);

            return false;
        }

        return true;
    }
}