import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course.model';

const API = environment.api;
@Injectable()
export class CourseHttpService {
  constructor(private http: HttpClient) {}

  public getCourses(): any {
    return this.http.get(`${API}/courses`);
  }

  public insertCourse(course: Course): any {
    return this.http.post(`${API}/courses`, course);
  }

  public updateCourse(course: Course): any {
    return this.http.put(`${API}/courses`, course);
  }

  public deleteCourse(courseId: number): any {
    return this.http.delete(`${API}/courses/${courseId}`);
  }
  
}
