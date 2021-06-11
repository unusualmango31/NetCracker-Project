import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { RegisterComponent } from "./auth/register/register.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { GuestGuard } from "./guards/guest.guard";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { BooksComponent } from "./home/books/books.component";
import { BookFormsComponent } from "./home/books-forms/book-forms.component";

const routes: Routes = [
    {
        path: "", children: [
            { path: "", redirectTo: "/login", pathMatch: "full" },
            { path: "login", component: AuthComponent, canActivate: [GuestGuard] },
            { path: "signup", component: RegisterComponent, canActivate: [GuestGuard] },
        ]
    },
    {
        path: "home", component: HomeComponent, children: [
            { path: "", component: BooksComponent },
            { path: "book/add", component: BookFormsComponent },
            { path: "book/edit/:id", component: BookFormsComponent },
        ]
    },
    { path: "error", component: ErrorPageComponent },
    { path: "**", redirectTo: "/error" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class BrAppRoutingModule {
}
