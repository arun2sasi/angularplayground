import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CourseComponent } from "./controllers/course.component";
import { CourseHttpService } from "./services/course.http-service";
import {HttpClientModule} from "@angular/common/http";
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { ToolbarModule } from "src/app/common/components/toolbar/toolbar.module";
import { CourseViewComponent } from "./controllers/course-view.component";
import { CourseService } from "./services/course.service";

@NgModule({
declarations:[CourseComponent, CourseViewComponent],
imports: [HttpClientModule,CommonModule, GridModule, ToolbarModule],
providers: [CourseHttpService , CourseService],
exports: [CourseComponent, CourseViewComponent]
})

export class CourseModule{}