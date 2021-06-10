import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "br-book-forms",
  templateUrl: "./book-forms.component.html",
  styleUrls: ["./book-forms.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormsComponent implements OnInit {
  ngOnInit(): void {
    console.log("books-forms is work");
  }

}
