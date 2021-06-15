import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { BooksService } from "../services/books.service";
import { Book } from "../models/books";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "br-recommendations",
  templateUrl: "./recommendations.component.html",
  styleUrls: ["./recommendations.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationsComponent implements OnInit, OnDestroy {
  selectedBooks: Book[] = [];
  booksFromServer: Book[];
  books: Book[];
  nameForSearch: string;
  page: number;
  pageSize: number;
  isLoadPossible: boolean;
  collectionSize: number;
  booksTags: string[] = [];
  private destroy$ = new Subject();

  constructor(
      public booksService: BooksService,
      public authService: AuthService,
      private router: Router,
  ) {
    this.page = 1;
    this.isLoadPossible = true;
    this.pageSize = 10;
  }

  ngOnInit(): void {
    this.booksService.sortedBooks$
        .pipe(takeUntil(this.destroy$))
        .subscribe( (books) => {
          this.collectionSize = books.length;
          this.booksFromServer = books;
          this.books = Object.assign([], books);
        });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  selectBook(book: Book): void {
    const selectedTags: string[] = book.tags;
    for (const selectedTag of selectedTags) {
      if (!this.booksTags.includes(selectedTag)) {
        this.booksTags.push(selectedTag);
      }
    }
    console.log(this.booksTags);
  }
  isBookSelected(book: Book): boolean {
    if (this.selectedBooks.includes(book)) {
      return true;
    }
    return false;
  }

  getBook(event: Event, selectedBook: Book): void {
    if ( event.target["checked"] ) {
      this.selectedBooks.push(selectedBook);
    } else {
      this.selectedBooks = this.selectedBooks.filter( (book) => book._id !== selectedBook._id);
    }
    console.log(this.selectedBooks);
  }
  getIndexForCurrentPage(index: number): number {
    return  this.page === 1 ? index : index + this.pageSize;
  }

  loadMore(): void {
    this.pageSize *= 2;
    this.collectionSize > this.pageSize ? this.isLoadPossible = true : this.isLoadPossible = false;
  }

  search(): void {
    this.books = this.nameForSearch === "" ? this.booksFromServer : this.books.filter( (res) => {
        return new RegExp(this.nameForSearch.toLowerCase()).exec(res.name.toLowerCase());
      });
  }

  submit(): void {
    this.router.navigate(["home/recommendations/result"]);
  }
}
