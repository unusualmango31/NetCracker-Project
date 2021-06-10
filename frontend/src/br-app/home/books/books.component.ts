import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "br-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent implements OnInit {
  ngOnInit(): void {
    console.log("books is work");
  }
}
