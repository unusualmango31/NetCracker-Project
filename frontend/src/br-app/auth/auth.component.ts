import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { getServerLoginError } from "../store/state/auth.state";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { formRedirect, login } from "../store/actions/auth.action";

@Component({
  selector: "br-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  serverError$: Observable<string> = this.store$.pipe(select(getServerLoginError));
  formTitle = "Авторизация";
  form: FormGroup;
  constructor(
      public router: Router,
      private auth: AuthService,
      private route: ActivatedRoute,
      private store$: Store,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submit(): void {
    this.store$.dispatch(login(this.form.value));
  }
  redirect(): void {
    this.store$.dispatch(formRedirect());
    this.router.navigate(["/signup"]);
  }
}
