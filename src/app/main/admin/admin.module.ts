import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {AdminRoutingModule} from '@app/main/admin/admin-routing.module';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [AdminComponent, UsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
