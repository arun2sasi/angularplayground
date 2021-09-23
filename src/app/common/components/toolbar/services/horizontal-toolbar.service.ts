import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable()
export class HorizontalToolbarService{
    public add$: Subject<boolean> = new Subject<boolean>();
    public edit$: Subject<boolean> = new Subject<boolean>();
    public save$: Subject<boolean> = new Subject<boolean>();
    public delete$: Subject<boolean> = new Subject<boolean>();
    public cancel$: Subject<boolean> = new Subject<boolean>();

}