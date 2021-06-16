import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { deleteBook, getBooks } from "../../store/actions/books.action";
import { BooksService } from "../../services/books.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
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
export class BooksComponent implements OnInit, OnDestroy {
  coverUrl = "";
  page: number;
  pageSize: number;
  collectionSize: number;
  private destroy$ = new Subject();

  constructor(
      private store$: Store,
      private router: Router,
      private modalService: NgbModal,
      public booksService: BooksService,
      public userService: UserService,
  ) {
    this.page = 1;
    this.pageSize = 6;
  }

  ngOnInit(): void {
    this.store$.dispatch(getBooks());
    this.booksService.books$
      .pipe(takeUntil(this.destroy$))
      .subscribe( (books) => {
        this.collectionSize = books.length;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
  editBook(bookIndex: number, selectedBook: Book): void {
    this.booksService.selectedBook = selectedBook;
    this.router.navigate([`home/book/edit/${bookIndex}`]);
  }
  getIndexForCurrentPage(index: number): number {
    return index + (this.pageSize * (this.page - 1));
  }
}
