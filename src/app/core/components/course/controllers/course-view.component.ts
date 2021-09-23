import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseHttpService } from '../services/course.http-service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'course-view',
  templateUrl: '../views/course-view.component.html',
  styleUrls: ['../styles/course-view.component.scss'],
})
export class CourseViewComponent {
  private subscriptions: Subscription[] = [];
  private courseId: number = null;
  course: Course;
  //@Output('clear') clear: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private courseService: CourseService,
    private http: CourseHttpService,
    private activtedRoute: ActivatedRoute
  ) {
    this.subscriptions.push(this.watchRoute());
    this.subscriptions.push(this.getCourse());
  }

  getCourse(): Subscription {
    return this.http.getCourse(this.courseId).subscribe((c) => {
      this.course = c;
    });
  }

  watchRoute(): Subscription {
    return this.activtedRoute.params.subscribe((x) => {
      this.courseId = x['courseId'];
      console.log(x);
    });
  }

  clearContent() {
    this.course = null
  //  this.courseService.clear$.next(true);
    // this.clear.emit();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((x) => {
      x.unsubscribe();
    });
  }
}
