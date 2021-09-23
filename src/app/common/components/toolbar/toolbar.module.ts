import { NgModule } from "@angular/core";
import { HorizontalToolBarComponent } from "./controller/horizontal-toolbar.component";
import { ToolBarModule } from "@progress/kendo-angular-toolbar";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { HorizontalToolbarService } from "./services/horizontal-toolbar.service";

@NgModule({
    declarations:[HorizontalToolBarComponent],
    imports:[ToolBarModule,ButtonsModule],
    exports:[HorizontalToolBarComponent],
    providers: [HorizontalToolbarService]

})

export class ToolbarModule{

    
}