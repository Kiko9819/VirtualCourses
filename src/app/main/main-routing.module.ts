import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from '@app/core/guards/admin.guard';

const adminModule = () => import('./admin/admin.module');

const routes: Routes = [
  {
    path: '',
    component: MainComponent,

    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'admin',
        loadChildren: adminModule,
        canLoad: [AdminGuard]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
