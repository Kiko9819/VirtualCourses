import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Course} from '@app/main/courses/models/course.interface';
import {take} from 'rxjs/operators';
import {CoursesService} from '@app/main/courses/services/courses.service';
import {AccountService} from '@app/core/services/account.service';
import {Favorite} from '@app/core/models/favorite';
import {Rating} from '@app/core/models/rating';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnChanges {

  @Input() course: Course;
  @Input() ratings: Rating[];
  @Input() favorites: Favorite[];
  @Output() reload: EventEmitter<void> = new EventEmitter<void>();

  rating: Rating;
  inFavorites: boolean;
  favoriteIsChanging: boolean;
  rateIsChanging: boolean;

  constructor(private coursesService: CoursesService,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.setInFavoritesInitial();
    this.setInitialRating();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ratings && changes.ratings.currentValue && changes.ratings.currentValue.length) {
      this.setInitialRating();
    }
  }

  addToFav(course: Course): void {
    this.favoriteIsChanging = true;

    this.coursesService.addToFavorites(course).pipe(
      take(1)
    ).subscribe(data => {
      this.favoriteIsChanging = false;
      this.inFavorites = true;
    }, () => {
      this.favoriteIsChanging = false;
    });
  }

  removeFromFav(course: Course): void {
    this.favoriteIsChanging = true;
    const favorite = this.favorites.find(fav => {
      const favData = fav[this.accountService.userEmail] as any;

      return favData.id === course.id;
    });

    this.coursesService.removeFromFavorites(favorite.id).pipe(
      take(1)
    ).subscribe(() => {
      this.favoriteIsChanging = false;
      this.inFavorites = false;
    }, () => {
      this.favoriteIsChanging = false;
    });
  }

  updateRating(rating: number): void {
    this.rateIsChanging = true;

    const requestObject: Rating = {
      courseId: this.course.id,
      email: this.accountService.userValue.email,
      ratingValue: rating
    };
    if (this.rating.id || this.rating.id === 0) {
      requestObject.id = this.rating.id;
    }

    this.coursesService.saveCourseRating(requestObject).pipe(
      take(1)
    ).subscribe((data) => {
      this.rateIsChanging = false;
      this.reload.emit();
    }, () => {
      this.rateIsChanging = false;
    });
  }

  private setInitialRating(): void {
    const getRating = () => {
      if (this.ratings && this.ratings.length) {
        return this.ratings.find((r: Rating) => {
          return r.email === this.accountService.userEmail && r.courseId === this.course.id;
        });
      }
      return null;
    };

    const rating = getRating();
    if (rating && rating.courseId === this.course.id) {
      this.rating = rating;
    } else {
      this.rating = {
        courseId: this.course.id,
        email: this.accountService.userValue.email,
        ratingValue: 0
      };
    }
  }

  private setInFavoritesInitial(): void {
    this.favorites.forEach((favorite: Favorite) => {
      const favoriteData = favorite[this.accountService.userEmail] as any;
      if (favoriteData.id === this.course.id) {
        this.inFavorites = true;
      }
    });
  }
}
