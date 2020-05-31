import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '@app/main/courses/models/course.interface';
import {environment} from '@environments/environment';
import {map} from 'rxjs/operators';
import {AccountService} from '@app/core/services/account.service';
import {Favorite} from '@app/core/models/favorite';
import {Rating} from '@app/core/models/rating';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  readonly CORE_URL = `${environment.apiUrl}`;
  readonly COURSES_URL = `${environment.apiUrl}/courses`;

  constructor(private httpClient: HttpClient, private accountsService: AccountService) {
  }

  removeFromFavorites(favoriteId: number): Observable<any> {
    return this.httpClient.delete(`${this.CORE_URL}/favorites/${favoriteId}`);
  }

  getFavorites(email: string): Observable<any> {
    return this.httpClient.get(`${this.CORE_URL}/favorites`).pipe(
      map((data: any) => {
        data = data.filter((x: Favorite) => {
          return x[email];
        });
        return data;
      })
    );
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.COURSES_URL);
  }

  getRatings(): Observable<any> {
    return this.httpClient.get(`${this.CORE_URL}/ratings`);
  }

  getById(courseId: string | number): Observable<any> {
    return this.httpClient.get(`${this.COURSES_URL}/${courseId}`);
  }

  create(course: Course): Observable<any> {
    return this.httpClient.post(this.COURSES_URL, course);
  }

  update(course: Course): Observable<any> {
    return this.httpClient.put(`${this.COURSES_URL}/${course.id}`, course);
  }

  delete(courseId: string | number): Observable<any> {
    return this.httpClient.delete(`${this.COURSES_URL}/${courseId}`);
  }

  saveCourseRating(rating: Rating): Observable<any> {
    const ratingExists = () => {
      return (rating.id || rating.id === 0);
    };
    if (ratingExists()) {
      return this.updateRating(rating);
    }
    return this.createRating(rating);
  }

  createRating(rating: Rating): Observable<any> {
    return this.httpClient.post(`${this.CORE_URL}/ratings`, rating);
  }

  updateRating(rating: Rating) {
    return this.httpClient.put(`${this.CORE_URL}/ratings/${rating.id}`, rating);
  }

  saveCourse(course: Course): any {
    if (course.id || course.id === 0) {
      return this.update(course);
    } else {
      return this.create(course);
    }
  }

  addToFavorites(course: Course): any {
    const user = this.accountsService.userValue;
    const body = {
      [user.email]: course
    };

    return this.httpClient.post(`${this.CORE_URL}/favorites`, body);
  }
}
