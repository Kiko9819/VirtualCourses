import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import {CoursesRoutingModule} from '@app/main/courses/courses-routing.module';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { CourseComponent } from './course/course.component';
import { CourseManageComponent } from './course-manage/course-manage.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@app/shared/shared.module";



@NgModule({
  declarations: [CoursesComponent, CourseComponent, CourseManageComponent, CourseEditComponent],
  imports: [
    NgbRatingModule,
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
