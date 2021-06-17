import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { BooksService } from "../services/books.service";
import { Book } from "../models/books";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { addTags } from "../store/actions/recommendations.action";
import { UserService } from "../services/user.service";
import { updateUser } from "../store/actions/user.action";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
  userTags: string[];
  nameForSearch: string;
  page: number;
  pageSize: number;
  collectionSize: number;
  isLoadPossible: boolean;
  isAuth: boolean;

  private destroy$ = new Subject();

  constructor(
      public booksService: BooksService,
      public userService: UserService,
      public authService: AuthService,
      private modalService: NgbModal,
      private router: Router,
      private store$: Store,
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
    this.authService.isAuth$
        .pipe(takeUntil(this.destroy$))
        .subscribe( (isAuth) => {
          this.isAuth = isAuth;
        });
    if (this.isAuth) {
      this.userService.tags$
          .pipe(takeUntil(this.destroy$))
          .subscribe( (tags) => {
            this.userTags = tags;
          });
    }

  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getBooksTags(): string[] {
    const selectedTags: string[] = [];
    for (const book of this.selectedBooks) {
      for (const tag of book.tags) {
        if (!selectedTags.includes(tag)) {
          selectedTags.push(tag);
        }
      }
    }
    return selectedTags;
  }
  getAllTags(): string[] {
    const tags: string[] = [];
    const booksTags = this.getBooksTags();
    if (booksTags.length > 0) {
      for (const bookTag of booksTags) {
        if (!tags.includes(bookTag.toLowerCase())) {
          tags.push(bookTag.toLowerCase());
        }
      }
    }
    if (this.isAuth && this.userTags.length > 0) {
      for (const userTag of this.userTags) {
        if (!tags.includes(userTag.toLowerCase())) {
          tags.push(userTag.toLowerCase());
        }
      }
    }
    return tags;
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
  }

  getIndexForCurrentPage(index: number): number {
    return this.page === 1 ? index : index + this.pageSize;
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

  submit(modalTemplateRef: TemplateRef<unknown>): void {
    this.store$.dispatch( addTags( { tags: this.getAllTags(), selectedBooks: this.selectedBooks } ));

    if (this.isAuth) {
      this.modalService.open(modalTemplateRef, { scrollable: true, centered: true });
    }
    if (!this.isAuth) {
      this.router.navigate(["home/recommendations/result"]);
    }
  }
  addTagsToUserAcc(): void {
    const newTags = Object.assign(this.getAllTags());
    const updatedCurrentUser = { ...this.userService.currentUser, tags: newTags };
    this.store$.dispatch(updateUser({ userData: updatedCurrentUser }));
    this.router.navigate(["home/recommendations/result"]);
  }
  cancelAdd(): void {
    this.router.navigate(["home/recommendations/result"]);
  }
}
