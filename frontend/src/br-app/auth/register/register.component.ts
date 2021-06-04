import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { getServerSignUpError } from "../../store/state/auth.state";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { formRedirect, signUp } from "../../store/actions/auth.action";

@Component({
  selector: "br-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  serverError$: Observable<string> = this.store$.pipe(select(getServerSignUpError));
  formTitle = "Регистрация";
  form: FormGroup;
  constructor(
      private auth: AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private store$: Store,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submit(): void {
    this.store$.dispatch(signUp(this.form.value));
  }
  redirect(): void {
    this.store$.dispatch(formRedirect());
    this.router.navigate(["/login"]);
  }
}
