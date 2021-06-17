import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { of, pipe } from "rxjs";
import {
    getUserData,
    getUserDataFail,
    getUserDataSuccess,
    updateUser,
    updateUserSuccess,
    userLogout,
} from "../actions/user.action";
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
            return getUserData();
        }),
    ));
    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(updateUser),
        mergeMap((action) => {
            return this.userService.updateUser(action.userData);
        }),
        pipe(
            map((user) => updateUserSuccess( { userData: user })),
        ),
    ));
    logoutUser$ = createEffect( () => this.actions$.pipe(
        ofType(logout),
        map( () => {
            return userLogout();
        }),
    ));
    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) {
    }
}
