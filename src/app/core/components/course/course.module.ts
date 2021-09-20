import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CourseComponent } from "./controllers/course.component";
import { CourseHttpService } from "./services/course.http-service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
declarations:[CourseComponent],
imports: [HttpClientModule,CommonModule],
providers: [CourseHttpService],
exports: [CourseComponent]

})


export class CourseModule{}