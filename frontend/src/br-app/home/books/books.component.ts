import { ChangeDetectionStrategy, Component, OnInit, TemplateRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { deleteBook, getBooks } from "../../store/actions/books.action";
import { BooksService } from "../../services/books.service";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Book } from "../../models/books";

@Component({
  selector: "br-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent implements OnInit {
  isReverse: boolean = false;
  coverUrl = "";
  constructor(
      private store$: Store,
      private router: Router,
      private modalService: NgbModal,
      public booksService: BooksService,
      public userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.store$.dispatch(getBooks());
  }
  addBook(): void {
    this.router.navigate(["home/book/add"]);
  }
  openModal(modalTemplateRef: TemplateRef<unknown>, modalType: string, selectedBook: Book): void {
    this.booksService.selectedBook = selectedBook;
    if (modalType === "description") {
      this.coverUrl = selectedBook.imgUrl ? `url(${selectedBook.imgUrl})` : "url(../../../assets/cover.jpg)";
    }

    this.modalService.open(modalTemplateRef, { scrollable: true, centered: true });
  }
  deleteSelectedBook(): void {
    this.store$.dispatch(deleteBook());
  }
  editBook(selectedBook: Book): void {
    this.booksService.selectedBook = selectedBook;
    this.router.navigate([`home/book/edit`]);
  }
  loadBooks(): void {
    this.store$.dispatch(getBooks());
  }

  sort(fieldForSort: string): void {
    if (this.isReverse) {
      this.booksService.direction = "reverse";
    }
    if (!this.isReverse) {
      this.booksService.direction = "normal";
    }
    this.isReverse = !this.isReverse;
    this.booksService.fieldForSort = fieldForSort;
    this.store$.dispatch(getBooks());
  }
}
