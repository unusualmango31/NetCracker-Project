import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { Store, StoreModule } from "@ngrx/store";
import { authReducer } from "../store/reducers/auth.reducer";
import { AUTH_FEATURE_NAME } from "../store/state/auth.state";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "../store/effects/auth.effects";
import { JwtModule } from "@auth0/angular-jwt";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../interceptors/auth.interceptor";
import { AuthComponent } from "./auth.component";
import { initAuth } from "../store/actions/auth.action";


const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
  },
];


@NgModule({
  declarations: [
    RegisterComponent,
    AuthComponent,
  ],
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-explicit-any
        tokenGetter: (request) => request as any,
      }
    }),
    StoreModule.forFeature(AUTH_FEATURE_NAME, authReducer),
    EffectsModule.forFeature([AuthEffects]),
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
})
export class AuthModule {
  constructor(store$: Store) {
    store$.dispatch(initAuth());
  }
}
