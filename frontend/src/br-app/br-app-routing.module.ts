import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { RegisterComponent } from "./auth/register/register.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {
        path: "", children: [
            { path: "", redirectTo: "/login", pathMatch: "full" },
            { path: "login", component: AuthComponent },
            { path: "signup", component: RegisterComponent },
            { path: "home", component: HomeComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class BrAppRoutingModule {
}
