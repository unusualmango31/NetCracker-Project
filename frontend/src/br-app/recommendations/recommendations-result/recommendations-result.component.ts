import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "br-recommendations-result",
  templateUrl: "./recommendations-result.component.html",
  styleUrls: ["./recommendations-result.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationsResultComponent implements OnInit {
  ngOnInit(): void {
    console.log("result is working!");
  }

}
