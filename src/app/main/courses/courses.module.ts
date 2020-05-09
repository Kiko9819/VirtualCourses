import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import {CoursesRoutingModule} from '@app/main/courses/courses-routing.module';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [CoursesComponent],
  imports: [
    NgbRatingModule,
    CommonModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
