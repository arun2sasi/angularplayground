import { Component, ElementRef } from '@angular/core';
import { CourseHttpService } from '../services/course.http-service';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { State, process } from '@progress/kendo-data-query';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'course',
  templateUrl: '../views/course.component.html',
  styleUrls: ['../styles/course.component.scss'],
})
export class CourseComponent {
  @ViewChild('coursegrid') grid!: GridComponent;

  courses: Array<Course> = new Array<Course>(
    {
      course: 'Java',
      description: 'Basic Java Programming',
      author: 'John',
      price: 10,
    },
    {
      course: 'Angular',
      description: 'Angular Handson',
      author: 'Naiomi',
      price: 10,
    },
    {
      course: 'Python',
      description: 'Python Basics',
      author: 'Naveen',
      price: 10,
    }
  );
  public gridData: any[] = [];
  constructor(private coursehttpservice: CourseHttpService) {
    coursehttpservice.getCourses().subscribe((result: any) => {
      this.courses = result;
      this.gridData = result;
      console.log(result);
    });
  }

  addCourse() {
    //this.courses.unshift(new Course(0,"","","","",0));
    //this.gridData = this.courses;
    console.log(this.courses);

    this.grid.addRow(
      this.courses.unshift(new Course(0, 'aaa', 'aa', 'aa', 'aa', 0))
    );
  }

  editCourse() {
    console.log('edit');
  }

  deleteCourse() {
    console.log('deleted');
  }

  createNewCourse(): any {
    return {
      courseId: 0,
      courseCode: '',
      courseName: '',
      courseDescription: '',
      author: '',
      price: 0,
    };
  }
}
