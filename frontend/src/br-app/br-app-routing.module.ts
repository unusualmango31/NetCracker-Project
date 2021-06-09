import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { RegisterComponent } from "./auth/register/register.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { GuestGuard } from "./guards/guest.guard";
import { ErrorPageComponent } from "./error-page/error-page.component";

const routes: Routes = [
    {
        path: "", children: [
            { path: "", redirectTo: "/login", pathMatch: "full" },
            { path: "login", component: AuthComponent, canActivate: [GuestGuard] },
            { path: "signup", component: RegisterComponent, canActivate: [GuestGuard] },
            { path: "home", component: HomeComponent },
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
