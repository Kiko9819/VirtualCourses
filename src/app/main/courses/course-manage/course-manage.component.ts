import {Component, Input, OnInit} from '@angular/core';
import {Course} from '@app/main/courses/models/course.interface';
import {Favorite} from '@app/core/models/favorite';

@Component({
  selector: 'app-course-manage',
  templateUrl: './course-manage.component.html',
  styleUrls: ['./course-manage.component.scss']
})
export class CourseManageComponent implements OnInit {

  @Input() course: Course;

  constructor() { }

  ngOnInit(): void {
  }

}
