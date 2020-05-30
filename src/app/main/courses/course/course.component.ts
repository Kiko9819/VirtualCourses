import {Component, Input, OnInit} from '@angular/core';
import {Course} from '@app/main/courses/models/course.interface';
import {take} from 'rxjs/operators';
import {CoursesService} from '@app/main/courses/services/courses.service';
import {AccountService} from '@app/core/services/account.service';
import {Favorite} from '@app/core/models/favorite';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  @Input() course: Course;
  @Input() favorites: Favorite[];

  currentRate = 6;
  inFavorites: boolean;
  loading: boolean;

  constructor(private coursesService: CoursesService,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.setInFavoritesInitial();
  }

  addToFav(course: Course): void {
    this.loading = true;

    this.coursesService.addToFavorites(course).pipe(
      take(1)
    ).subscribe(data => {
      this.loading = false;
      this.inFavorites = true;
    }, () => {
      this.loading = false;
    });
  }

  removeFromFav(course: Course): void {
    this.loading = true;
    const favorite = this.favorites.find(fav => {
      const favData = fav[this.accountService.userEmail] as any;

      return favData.id === course.id;
    });

    this.coursesService.removeFromFavorites(favorite.id).pipe(
      take(1)
    ).subscribe(() => {
      this.loading = false;
      this.inFavorites = false;
    }, () => {
      this.loading = false;
    });
  }

  private setInFavoritesInitial() {
    this.favorites.forEach((favorite: Favorite) => {
      const favoriteData = favorite[this.accountService.userEmail] as any;
      if (favoriteData.id === this.course.id) {
        this.inFavorites = true;
      }
    });
  }
}
