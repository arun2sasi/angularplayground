import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'course-view',
  templateUrl: '../views/course-view.component.html',
  styleUrls: ['../styles/course-view.component.scss'],
})
export class CourseViewComponent {
  @Input('course') course: Course;
  //@Output('clear') clear: EventEmitter<any> = new EventEmitter<any>();
 
  constructor(private courseService: CourseService){

  }

  clearContent() {
    this.courseService.clear$.next(true);
   // this.clear.emit();
  }
}
