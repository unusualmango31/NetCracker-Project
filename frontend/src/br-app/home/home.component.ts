import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { logout } from "../store/actions/auth.action";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

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
      private store$: Store,
      private router: Router,
  ) {
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    console.log("home is working");
  }
  test(): void {
    this.httpClient.get("/api/users/60c0848d5f58cc360cdd3023")
        .pipe(takeUntil(this.destroy$))
        .subscribe(console.log);
  }
  logout(): void {
    this.store$.dispatch(logout());
  }
  auth(): void {
    this.router.navigate(["/login"]);
  }
}
