import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { AuthService } from "../../services/auth.service";
import {
    initAuth,
    login,
    loginFailed,
    loginSuccess, logout, logoutSuccess,
    signUp,
    signUpFailed,
    signUpSuccess,
} from "../actions/auth.action";
import { Router } from "@angular/router";
import { LoginData } from "../state/auth.state";
import { Store } from "@ngrx/store";

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
    saveAuthDataToLocalStorage$ = createEffect( () => this.actions$.pipe(
        ofType(loginSuccess),
        map( ( { loginData }) => {
            localStorage.setItem("authData", JSON.stringify(loginData));
        })),
    { dispatch: false });

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

    extractLoginData$ = createEffect( () => this.actions$.pipe(
        ofType(initAuth),
        map( () => {
            const authDataString = localStorage.getItem("authData");
            if (!authDataString) {
                return logoutSuccess();
            }

            const loginData: LoginData = JSON.parse(authDataString);
            if ( ( ( loginData.exp * 1000) - (10 * 1000) - Date.now() ) < 0 ) {
                return logoutSuccess();
            }
            return loginSuccess( { loginData });
        }),
    ));

    logout$ = createEffect( () => this.actions$.pipe(
        ofType(logout),
        map( () => {
            localStorage.removeItem("authData");
            return logoutSuccess();
        }),
    ));
    constructor(
        private router: Router,
        private actions$: Actions,
        private store$: Store,
        private authService: AuthService,
    ) { }
}
