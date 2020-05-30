import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CoursesService } from './services/courses.service';
import { take } from 'rxjs/operators';
import { Course } from './models/course.interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: Course[];
  manageCourses: boolean;
  // TODO Remove, once rating is implemented
  currentRate = 6;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {
    this.manageCourses = this.route.snapshot.data['manageCourses'];
  }

  ngOnInit(): void {
    this.coursesService.getAll().pipe(
      take(1)
    ).subscribe(courses => this.courses = courses);
  }

  addToFav(course: Course): void {
    this.coursesService.addToFavorites(course).pipe(
      take(1)
    ).subscribe(data => console.log(data));
  }

}
