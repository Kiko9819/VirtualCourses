import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/services/courses.service';
import { Course } from '../courses/models/course.interface';
import { take } from 'rxjs/operators';
import { AccountService } from '@app/core/services/account.service';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss']
})
export class MyFavoritesComponent implements OnInit {

  courses: Course[];

  constructor(private coursesService: CoursesService,
              private accountsService: AccountService,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.coursesService.getFavorites(this.accountsService.userValue.email).pipe(
        take(1)
      ).subscribe(courses => this.courses = courses);
  }

  get email(): string {
    if (this.accountService.userValue) {
      return this.accountService.userEmail;
    }

    return '';
  }
}
