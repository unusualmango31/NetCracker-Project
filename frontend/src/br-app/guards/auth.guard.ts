import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService,
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<UrlTree | boolean> | Promise<UrlTree | boolean> | UrlTree | boolean {
    return this.getIsAuth();
  }

  private getIsAuth(): Observable<boolean> {
    return this.authService.isAuth$.pipe(
        first(),
        map( (isAuth) => {
          if (!isAuth) {
            this.router.navigate(["/login"]);
          }

          return isAuth;
        }),
    );
  }
}
