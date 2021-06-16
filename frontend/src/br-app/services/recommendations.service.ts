import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { BooksService } from "./books.service";
import { Observable, of } from "rxjs";
import { Book, BooksRecommended } from "../models/books";
import { getSelectedBooks, getSortedRecommendedBooks, getTags } from "../store/state/recommendations.state";

@Injectable({
  providedIn: "root"
})
export class RecommendationsService {
  tags$ = this.store$.pipe(
      select(getTags),
  );
  recommendedBooks$ = this.store$.pipe(
      select(getSortedRecommendedBooks),
  );
  selectedBooks$ = this.store$.pipe(
      select(getSelectedBooks),
  );
  tags: string[];
  selectedBooks: Book[];
  books: Book[];

  constructor(
      private store$: Store,
      private booksService: BooksService,
  ) {
    this.tags$.subscribe( (tags) => {
      this.tags = tags;
    });
    this.selectedBooks$.subscribe( (books) => {
      this.selectedBooks = books;
    });
    this.booksService.books$.subscribe( (books) => {
      this.books = books;
    });
  }

  getRecommendations(): Observable<BooksRecommended[]> {
    const booksRecommended: BooksRecommended[] = [];
    const notSelectedBooks: Book[] = [];
    for ( const book of this.books ) {
      if ( !this.selectedBooks.includes(book) ) {
        notSelectedBooks.push(book);
      }
    }

    for (const book of notSelectedBooks) {
      if (!booksRecommended.includes(book)) {
        booksRecommended.push( { ...book, coefficient: this.getJaccardIndex(this.tags, book) });
      }
    }
    return of( booksRecommended.filter( (book) => book.coefficient > 0) );
  }
  getJaccardIndex(tags: string[], book: Book): number {
    const union = this.getUnion(tags, book.tags);
    const crossing = this.getCrossing(tags, book.tags);
    return crossing / union;
  }
  getUnion (tags: string[], bookTags: string[]): number {
    const concatArr: string[] = [...tags, ...bookTags];
    const resultArr: string[] = [];
    for (const elem of concatArr) {
      if (!resultArr.includes(elem)) {
        resultArr.push(elem);
      }
    }
    return resultArr.length;
  }
  getCrossing (tags: string[], bookTags: string[]): number {
    let counter = 0;
    for (const tag of tags) {
      if (bookTags.includes(tag)) {
        counter++;
      }
    }
    return counter;
  }
}
