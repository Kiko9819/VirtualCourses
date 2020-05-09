import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const mainModule = () => import('./main/main.module').then(x => x.MainModule);

const routes: Routes = [
    { path: 'account', loadChildren: accountModule },
    { path: '', loadChildren: mainModule, canLoad: [AuthGuard]},
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
