import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '@app/main/courses/models/course.interface';
import {CoursesService} from '@app/main/courses/services/courses.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-manage',
  templateUrl: './course-manage.component.html',
  styleUrls: ['./course-manage.component.scss']
})
export class CourseManageComponent {

  @Input() course: Course;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private coursesService: CoursesService, private router: Router) {
  }

  editCourse(courseId: number): void {
    this.router.navigate(['/admin/courses/' + courseId]);
  }

  deleteCourse(courseId: number): void {
    this.delete.emit(courseId);
  }

}
