import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "br-error-page",
  templateUrl: "./error-page.component.html",
  styleUrls: ["./error-page.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorPageComponent {
  constructor(
      private router: Router,
  ) {
  }
  return(): void {
    this.router.navigate(["/home"]);
  }

}
