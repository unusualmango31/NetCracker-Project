import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "br-error-page",
  templateUrl: "./error-page.component.html",
  styleUrls: ["./error-page.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorPageComponent implements OnInit {
  ngOnInit(): void {
    console.log("ErrorPage");
  }

}
