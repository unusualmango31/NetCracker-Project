import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Book } from "../models/books";
import { getAllGenres, getBooks, getSortedBooks } from "../store/state/books.state";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  books$ = this.store$.pipe(
      select(getBooks),
  );
  sortedBooks$ = this.store$.pipe(
      select(getSortedBooks),
  );
  genres$ = this.store$.pipe(
      select(getAllGenres),
  );
  selectedBook: Book;
  constructor(
      private httpClient: HttpClient,
      private store$: Store,
  ) {
  }

  getBooksFromServer(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`/api/books`);
  }

  createBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>("/api/books", book);
  }
  deleteBook(): Observable<Book>  {
    return this.httpClient.delete<Book>(`/api/books/${ this.selectedBook._id}`);
  }
  updateBook(book: Book): Observable<Book>  {
    console.log(this.selectedBook);
    console.log(book);
    return this.httpClient.patch<Book>(`/api/books/${ this.selectedBook._id}`, book);
  }
}

