import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { NgbRatingModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';



@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgbRatingModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    HeaderComponent
  ],
})
export class MainModule { }
