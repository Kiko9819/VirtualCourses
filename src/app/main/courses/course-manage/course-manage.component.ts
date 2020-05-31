import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '@app/main/courses/models/course.interface';
import {Favorite} from '@app/core/models/favorite';
import {CoursesService} from "@app/main/courses/services/courses.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-course-manage',
  templateUrl: './course-manage.component.html',
  styleUrls: ['./course-manage.component.scss']
})
export class CourseManageComponent implements OnInit {

  @Input() course: Course;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private coursesService: CoursesService) {
  }

  ngOnInit(): void {
  }

  editCourse(courseId: number): void {
    console.log(courseId);
    // navigate and pass in id
    // the edit/create component will load the course by id
  }

  deleteCourse(courseId: number): void {
    this.delete.emit(courseId);
  }

}
