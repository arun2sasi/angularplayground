import { Component, EventEmitter, Output } from "@angular/core";
import { HorizontalToolbarService } from "../services/horizontal-toolbar.service";
 
@Component({
selector: "horizontal-toolbar",
templateUrl:"../views/horizontal-toolbar.component.html",
styleUrls: ["../styles/horizontal-toolbar.component.scss"]

})

export class HorizontalToolBarComponent{
    
    @Output("add") add:EventEmitter<any> = new EventEmitter();
    @Output("edit") edit:EventEmitter<any> = new EventEmitter();
    @Output("delete") delete:EventEmitter<any> = new EventEmitter();
    @Output("save") save:EventEmitter<any> = new EventEmitter();
    @Output("cancel") cancel:EventEmitter<any> = new EventEmitter();

    constructor(private horizontalToolbarService:HorizontalToolbarService){

    }
    addEmitter(){
        this.add.emit();
        this.horizontalToolbarService.add$.next(true);        
    }

    editEmitter(){
        this.edit.emit();
        this.horizontalToolbarService.edit$.next(true);
    }

    deleteEmitter(){
        this.delete.emit();
        this.horizontalToolbarService.delete$.next(true);
    }

    saveEmitter(){
        this.save.emit();
        this.horizontalToolbarService.save$.next(true);
    }

    cancelEmitter(){
        this.cancel.emit();
        this.horizontalToolbarService.cancel$.next(true);
    }


}
