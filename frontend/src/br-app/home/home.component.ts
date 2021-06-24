import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { logout } from "../store/actions/auth.action";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { UserService } from "../services/user.service";
import { getBooksForRec } from "../store/actions/books.action";

@Component({
  selector: "br-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnDestroy, OnInit {
  isHomePage = true;
  private destroy$ = new Subject();
  constructor(
      private httpClient: HttpClient,
      public authService: AuthService,
      public userService: UserService,
      private store$: Store,
      private router: Router,
  ) {
  }
  ngOnInit(): void {
    this.store$.dispatch(getBooksForRec());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getRecommendOrReturn(): void {
    this.isHomePage ? this.router.navigate(["home/recommendations"]) : this.router.navigate(["home"]);
    this.isHomePage = !this.isHomePage;
  }
  logout(): void {
    this.store$.dispatch(logout());
  }
  auth(): void {
    this.router.navigate(["login"]);
  }
}
