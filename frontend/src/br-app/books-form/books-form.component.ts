import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "br-books-form",
  templateUrl: "./books-form.component.html",
  styleUrls: ["./books-form.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksFormComponent implements OnInit {
  ngOnInit(): void {
    console.log("Books forms");
  }

}
