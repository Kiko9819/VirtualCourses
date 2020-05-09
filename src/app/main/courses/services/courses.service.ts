import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '@app/main/courses/models/course.interface';
import {MainModule} from '@app/main/main.module';

@Injectable({
  providedIn: MainModule
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get('api_url/courses');
  }

  getById(courseId: string | number): Observable<any> {
    return this.httpClient.get(`api_url/${courseId}`);
  }

  create(course: Course): Observable<any> {
    return this.httpClient.post('api_url', {course});
  }

  update(course: Course): Observable<any> {
    return this.httpClient.patch('api_url', {course});
  }

  delete(courseId: string | number): Observable<any> {
    return this.httpClient.delete(`api_url/${courseId}`);
  }

  save(course: Course): any {
    if (course.id) {
      return this.update(course);
    } else {
      return this.create(course);
    }
  }
}
