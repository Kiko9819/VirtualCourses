import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import {CoursesRoutingModule} from '@app/main/courses/courses-routing.module';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { CourseComponent } from './course/course.component';
import { CourseManageComponent } from './course-manage/course-manage.component';



@NgModule({
  declarations: [CoursesComponent, CourseComponent, CourseManageComponent],
  imports: [
    NgbRatingModule,
    CommonModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
