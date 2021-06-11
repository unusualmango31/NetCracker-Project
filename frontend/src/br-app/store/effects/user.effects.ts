import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of, pipe } from "rxjs";
import { getUserData, getUserDataFail, getUserDataSuccess, userLogout } from "../actions/user.action";
import { UserService } from "../../services/user.service";
import { loginSuccess, logout } from "../actions/auth.action";

@Injectable({ providedIn: "root" })
export class UserEffects {
    getUser$ = createEffect(() => this.actions$.pipe(
        ofType(getUserData),
        switchMap(() => {
            return this.userService.getUserData();
        }),
        pipe(
            map((userData) => getUserDataSuccess( { userData })),
            catchError(
                (error) => of(getUserDataFail({
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    errors: error.error.message
                })),
            ),
        ),
    ));
    getAuthUserData$ = createEffect( () => this.actions$.pipe(
        ofType(loginSuccess),
        map( () => {
            console.log("get user data after login");
            return getUserData();
        }),
    ));
    logoutUser$ = createEffect( () => this.actions$.pipe(
        ofType(logout),
        map( () => {
            console.log("logout");
            return userLogout();
        }),
    ));
    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) {
    }
}
