import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class CourseService{
    public clear$: Subject<boolean> = new Subject<boolean>();
  

    
} 