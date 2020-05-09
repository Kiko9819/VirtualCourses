import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule
  ],
  exports: [AlertComponent]
})
export class SharedModule { }
