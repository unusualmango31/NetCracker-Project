import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { BrAppComponent } from "./br-app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrAppRoutingModule } from "./br-app-routing.module";
import { environment } from "@env/environment";
import { AuthModule } from "./auth/auth.module";
import { HomeComponent } from "./home/home.component";
import { BooksFormComponent } from "./books-form/books-form.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AuthGuard } from "./guards/auth.guard";
import { GuestGuard } from "./guards/guest.guard";
import { ErrorPageComponent } from "./error-page/error-page.component";

@NgModule({
    declarations: [
        BrAppComponent,
        HomeComponent,
        BooksFormComponent,
        ErrorPageComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrAppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot( {}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        AuthModule,
    ],
    providers: [
        AuthGuard,
        GuestGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [ BrAppComponent],
})
export class BrAppModule {
}
