import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { login, loginFailed, loginSuccess, signUp, signUpFailed, signUpSuccess } from "../actions/auth.action";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        switchMap((action) => this.authService.login({
            email: action.email,
            password: action.password
        }).pipe(
            map((loginSuccessData) => loginSuccess( { loginData: loginSuccessData })),
            catchError(
                (error) => of(loginFailed({
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    serverLoginError: error.error.message
                })),
            ),
        )),
    ));
    signUp$ = createEffect(() => this.actions$.pipe(
        ofType(signUp),
        switchMap((action) => this.authService.signUp({
            email: action.email,
            username: action.username,
            password: action.password
        }).pipe(
            map((signUpSuccessData) => signUpSuccess( { signUpData: signUpSuccessData })),
            catchError(
                (error) => of(signUpFailed({
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    serverSignUpError: error.error.message
                })),
            ),
        )),
    ));

    loginRedirect$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccess),
        map( (action) => {
            this.router.navigate(["/home"]);
        })),
    { dispatch: false });
    signUpRedirect$ = createEffect(() => this.actions$.pipe(
        ofType(signUpSuccess),
        map( (action) => {
            this.router.navigate(["/login"]);
        })),
        { dispatch: false });

    constructor(
        private router: Router,
        private actions$: Actions,
        private authService: AuthService,
    ) { }
}
