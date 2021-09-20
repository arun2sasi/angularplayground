import { Component } from "@angular/core";
import { CourseHttpService } from "../services/course.http-service";

@Component({
    selector:"course",
    templateUrl: "../views/course.component.html",
    styleUrls: ["../styles/course.component.scss"]
})


export class CourseComponent{
    courses: Array<String> = [];
    constructor(private coursehttpservice: CourseHttpService){
        coursehttpservice.getCourses().subscribe((result:any) => {
            this.courses = result;
            console.log(result);
        });
    }
}