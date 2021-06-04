import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SignUpData } from "../store/state/auth.state";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(
        private httpClient: HttpClient,
        private jwtHelperService: JwtHelperService,
    ) {
    }
    login(loginData: { email: string, password: string }): Observable<{ token: string }> {
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
        return this.httpClient.post<SignUpData>("/api/auth/register", signUpData);
    }
}
