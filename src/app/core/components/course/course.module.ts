import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CourseComponent } from "./controllers/course.component";
import { CourseHttpService } from "./services/course.http-service";
import {HttpClientModule} from "@angular/common/http";
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { ToolbarModule } from "src/app/common/components/toolbar/toolbar.module";

@NgModule({
declarations:[CourseComponent],
imports: [HttpClientModule,CommonModule, GridModule, ToolbarModule],
providers: [CourseHttpService],
exports: [CourseComponent]
})

export class CourseModule{}