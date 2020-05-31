import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from './services/courses.service';
import {take} from 'rxjs/operators';
import {Course} from './models/course.interface';
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

  get isAdmin(): boolean {
    if (this.accountService.userValue) {
      return this.accountService.isAdmin();
    }
    return false;
  }

  ngOnInit(): void {
    this.fetchCourses();
    this.fetchFavorites();
  }

  deleteCourse(courseId: number): void {
    this.coursesService.delete(courseId).pipe(
      take(1)
    ).subscribe(
      () => {
        this.filterCourses(courseId);
        this.findAndDeleteFavorite(courseId);
        console.log(this.favorites);
      },
      () => console.log('failed to delete')
    );
  }

  private findAndDeleteFavorite(courseId: number): void {
    const favorite = this.favorites.find(fav => {
      const favData = fav[this.accountService.userEmail] as any;

      return favData.id === courseId;
    });

    this.coursesService.removeFromFavorites(favorite.id).pipe(
      take(1)
    ).subscribe(() => this.filterFavorites(courseId));
  }

  private filterCourses(courseId: number): void {
    this.courses = this.courses.filter(course => course.id !== courseId);
  }

  private filterFavorites(courseId: number): void {
    this.favorites = this.favorites.filter(fav => {
      const favData = fav[this.accountService.userEmail] as any;

      return favData.id !== courseId;
    });
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
