import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Course} from '@app/main/courses/models/course.interface';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '@app/main/courses/services/courses.service';
import {take} from 'rxjs/operators';
import {AlertService} from '@app/core/services/alert.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  course: Course;

  formGroup: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private alertService: AlertService,
              private coursesService: CoursesService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.activatedRoute.params.subscribe(params => {
      this.coursesService.getById(params.id).pipe(
        take(1)
      ).subscribe(course => {
        this.course = course;
        this.formGroup.setValue({
          title: course.title,
          description: course.description,
          publishDate: course.publishDate,
        });
      });
    });
  }

  get f() {
    return this.formGroup.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;

    const requestObject = {
      ...this.formGroup.value,
      id: this.course.id,
      rating: this.course.rating
    };

    this.coursesService.saveCourse(requestObject).pipe(
      take(1)
    ).subscribe(() => {
      this.loading = false;
      this.clearFormGroup();
      this.alertService.success('Successfully create a new Course');
    }, (error) => {
      this.loading = false;
      this.alertService.error(error);
    });
  }

  private buildForm(): void {
    if (!this.course) {
      this.course = {
        title: '',
        description: '',
        publishDate: ''
      };
    }
    this.formGroup = this.formBuilder.group({
      title: [this.course.title, Validators.required],
      description: [this.course.description, Validators.required],
      publishDate: [this.course.publishDate, Validators.required],
    });
  }

  private clearFormGroup(): void {
    this.formGroup.reset();
    for (const name in this.f) {
      this.formGroup.controls[name].setErrors(null);
    }
  }
}
