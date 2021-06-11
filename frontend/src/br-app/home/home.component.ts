import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { logout } from "../store/actions/auth.action";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { UserService } from "../services/user.service";

@Component({
  selector: "br-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  constructor(
      private httpClient: HttpClient,
      public authService: AuthService,
      public userService: UserService,
      private store$: Store,
      private router: Router,
  ) {
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    console.log("home is work");
  }
  test(): void {
    console.log("редирект на составление рекомендаций");
  }
  logout(): void {
    this.store$.dispatch(logout());
  }
  auth(): void {
    this.router.navigate(["/login"]);
  }
}
