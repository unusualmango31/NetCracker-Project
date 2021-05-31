import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { BrAppComponent } from "./br-app.component";
import { FormsModule }  from "@angular/forms";

@NgModule({
    declarations: [
        BrAppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [BrAppComponent],
})
export class BrAppModule {
}
