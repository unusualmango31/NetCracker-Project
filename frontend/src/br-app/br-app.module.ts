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
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AuthGuard } from "./guards/auth.guard";
import { GuestGuard } from "./guards/guest.guard";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeModule } from "./home/home.module";
import { UserEffects } from "./store/effects/user.effects";
import { userReducer } from "./store/reducers/user.reducer";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BooksEffects } from "./store/effects/books.effects";
import { booksReducer } from "./store/reducers/books.reducer";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
        BrAppComponent,
        ErrorPageComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrAppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot( { user: userReducer, books: booksReducer }),
        EffectsModule.forRoot([UserEffects, BooksEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        AuthModule,
        HomeModule,
        NgbModule,
        MatIconModule,
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
