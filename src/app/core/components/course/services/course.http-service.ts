import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()

export class CourseHttpService{

   constructor(private http:HttpClient){



   }

//    public getCourses(): any{
//        return this.http.get(`https://localhost:5001/courses`);
//    }
    public getCourses():Observable<any> {

        return of(["Angular","Python","Java", "Big Data", "Azure"]);
    }
}

