import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CoursesService } from './services/courses.service';
import { take } from 'rxjs/operators';
import { Course } from './models/course.interface';
import {AccountService} from '@app/core/services/account.service';
import {Favorite} from '@app/core/models/favorite';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: Course[];
  favorites: Favorite[];
  manageCourses: boolean;
  // TODO Remove, once rating is implemented


  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService,
              private accountService: AccountService) {
    this.manageCourses = this.route.snapshot.data['manageCourses'];
  }

  ngOnInit(): void {
    this.fetchCourses();
    this.fetchFavorites();
  }

  private fetchCourses(): void {
    this.coursesService.getAll().pipe(
      take(1)
    ).subscribe(courses => this.courses = courses);
  }

  private fetchFavorites(): void {
    this.coursesService.getFavorites(this.accountService.userEmail).pipe(
      take(1)
    ).subscribe(data => this.favorites = data);
  }
}
