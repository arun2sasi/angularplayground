import { Component, ElementRef } from '@angular/core';
import { CourseHttpService } from '../services/course.http-service';
import {
  GridDataResult,
  PageChangeEvent,
  SelectableSettings,
} from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { Observable, Subscription } from 'rxjs';
import { Course } from '../models/course.model';
import { State, process } from '@progress/kendo-data-query';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { CourseService } from '../services/course.service';
import { HorizontalToolbarService } from 'src/app/common/components/toolbar/services/horizontal-toolbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'course',
  templateUrl: '../views/course.component.html',
  styleUrls: ['../styles/course.component.scss'],
})
export class CourseComponent {
  @ViewChild('grid') grid: GridComponent;
  public text: string = 'INI';
  public addedCourse: Course;
  public editable: boolean = false;
  courses: Array<Course> = new Array<Course>();
  public gridData: any[] = [];
  selectedCourseId: number = null;
  public selectedCourse: Course = null;
  saveCourseList: Course[] = [];
  private subscriptions: Subscription[] = [];
  public selectableSettings: SelectableSettings = {
    checkboxOnly: true,
    mode: 'single',
  };
  constructor(
    private formBuilder: FormBuilder,
    private coursehttpservice: CourseHttpService,
    private courseService: CourseService,
    private horizontalToolbarService: HorizontalToolbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.getCourses());
    this.subscriptions.push(this.watchClear());
    this.subscriptions.push(this.watchEdit());
    this.subscriptions.push(this.watchSave());
    this.subscriptions.push(this.watchDelete());
    this.subscriptions.push(this.watchCancel());
  }

  getCourses(): Subscription {
    return this.coursehttpservice.getCourses().subscribe((result: any) => {
      this.courses = result;
      this.gridData = result;
    });
  }

  public onStateChange(state: State) {
    // console.log(state);
  }

  public change(e: any) {
    console.log(e);

    var grid = e.sender.element.closest('.k-grid').data('gridData');

    var row = e.sender.element.closest('tr');

    var dataItem = grid.dataItem(row);
    console.log(dataItem);
    //var grid = this.grid.data;
  }

  public cellClickHandler({
    sender,
    rowIndex,
    columnIndex,
    dataItem,
    isEdited,
  }) {
    if (!isEdited) {
      sender.editCell(rowIndex, columnIndex, this.createFormGroup(dataItem));
    }
  }

  public cellCloseHandler(args: any) {
    const { formGroup, dataItem } = args;

    if (!formGroup.valid) {
      // prevent closing the edited cell if there are invalid values.
      args.preventDefault();
    } else if (formGroup.dirty) {
      this.saveCourseList = this.saveCourseList.filter(
        (obj) => obj['courseId'] != dataItem['courseId']
      );
      this.saveCourseList.push(formGroup.value);
      console.log(this.saveCourseList);
      //console.log(dataItem);
      Object.assign(dataItem, formGroup.value);
    }
  }

  public selectedKeysChange(event) {
    this.selectedCourseId = event[0];
  }

  add() {
    this.grid.addRow(this.createFormGroup(new Course()));
  }

  save() {
    //console.log( this.addedCourse);
    for (let entry of this.saveCourseList) {
      entry = entry as Course;
      this.subscriptions.push(
        this.coursehttpservice.updateCourse(entry).subscribe((d) => {
          this.subscriptions.push(this.getCourses());
        })
      );
    }
  }

  view() {
    console.log(this.selectedCourseId);
    this.selectedCourse = this.gridData.find(
      (data: Course) => data.courseId == this.selectedCourseId
    );
    //console.log(this.selectedCourse);
  }
  edit() {
    this.editable = true;
  }

  delete() {
    this.subscriptions.push(
      this.coursehttpservice
        .deleteCourse(this.selectedCourseId)
        .subscribe((d) => {
          this.subscriptions.push(this.getCourses());
        })
    );
  }

  cancel() {
    this.editable = false;
    this.subscriptions.push(this.getCourses());
  }

  clear() {
    this.selectedCourse = null;
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

  public createFormGroup(dataItem: any): FormGroup {
    return this.formBuilder.group({
      courseId: dataItem.courseId,
      courseName: [dataItem.courseName, Validators.required],
      courseCode: dataItem.courseCode,
      courseDescription: dataItem.courseDescription,
      author: dataItem.author,
      price: dataItem.price,
    });
  }

  public goToCourseView() {
    this.router.navigateByUrl(`course-view/${this.selectedCourseId}`);
  }

  watchClear(): Subscription {
    return this.courseService.clear$.subscribe((s) => {
      if (s) {
        this.clear();
      }
    });
  }

  watchSave(): Subscription{
   return this.horizontalToolbarService.save$.subscribe((s) => {
     if(s){
       this.save();
     }
   });
  }

  watchDelete(): Subscription{
    return this.horizontalToolbarService.delete$.subscribe((s) => {
      if(s){
        this.delete();
      }
    });
   }
 
  
  watchEdit(): Subscription {
    return this.horizontalToolbarService.edit$.subscribe((s) => {
      if (s) {
        this.edit();
      }
    });
  }

  watchCancel(): Subscription {
    return this.horizontalToolbarService.cancel$.subscribe((s) => {
      if (s) {
        this.cancel();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }
}
