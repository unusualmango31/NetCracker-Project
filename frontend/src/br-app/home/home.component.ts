import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "br-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    console.log("home is working");
  }

}
