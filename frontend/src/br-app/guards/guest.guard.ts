import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { first, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GuestGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService,
  ) {
  }
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<UrlTree | boolean> | Promise<UrlTree | boolean> | UrlTree | boolean {
    return this.getIsGuest();
  }

  private getIsGuest(): Observable<boolean> {
    return this.authService.isGuest$.pipe(
        first(),
        map( (isGuest) => {
          if (!isGuest) {
            this.router.navigate(["/home"]);
          }

          return isGuest;
        }),
    );
  }
}
