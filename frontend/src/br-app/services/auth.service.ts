import * as CryptoJS  from "crypto-js";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { getLoginData, SignUpData } from "../store/state/auth.state";
import { JwtHelperService } from "@auth0/angular-jwt";
import { filter, map } from "rxjs/operators";
import { select, Store } from "@ngrx/store";


@Injectable({
    providedIn: "root"
})
export class AuthService {
    isAuth$ = this.store$.pipe(
        select(getLoginData),
        filter( ( authData ) => authData !== undefined ),
        map( ( loginData ) => !!loginData),
    );

    isGuest$ = this.isAuth$.pipe(
        map( ( isAuth ) => !isAuth),
    );
    secretKey: string = "recommendation";
    token?: string;
    constructor(
        private httpClient: HttpClient,
        private jwtHelperService: JwtHelperService,
        private store$: Store,
    ) {
    }
    login(loginData: { email: string, password: string }): Observable<{ token: string }> {
        loginData.password = CryptoJS.AES.encrypt( loginData.password, this.secretKey.trim()).toString();
        return this.httpClient.post<{ token: string }>("/api/auth/login", loginData).pipe(
            map( (res) => {
                return {
                    ...res,
                    ...this.jwtHelperService.decodeToken(res.token)
                };
            }),
        );
    }
    signUp(signUpData: { email: string, username: string, password: string }): Observable<SignUpData> {
        signUpData.password = CryptoJS.AES.encrypt( signUpData.password, this.secretKey.trim()).toString();
        return this.httpClient.post<SignUpData>("/api/auth/register", signUpData);
    }
}
