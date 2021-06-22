import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Book } from "../models/books";
import { getBooks, getSortedBooks } from "../store/state/books.state";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  page: number;
  pageSize: number;
  collectionSize: number;
  sortedBooks$ = this.store$.pipe(
      select(getSortedBooks),
  );
  books$ = this.store$.pipe(
      select(getBooks),
  );
  selectedBook: Book;

  constructor(
      private httpClient: HttpClient,
      private store$: Store,
  ) {
    this.page = 1;
    this.pageSize = 6;
  }

  getBooksFromServer(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`/api/books`);
  }

  getSeveralBooks(): Observable<{ books: Book[], collectionSize: number }> {
    const quantity = this.page * this.pageSize;
    const pos = (this.page - 1) * this.pageSize;
    return this.httpClient.get<{ books: Book[], collectionSize: number }>(`api/books/pagination?pos=${pos}&&q=${quantity}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>("/api/books", book);
  }
  deleteBook(): Observable<Book>  {
    return this.httpClient.delete<Book>(`/api/books/${ this.selectedBook._id}`);
  }
  updateBook(book: Book): Observable<Book>  {
    return this.httpClient.patch<Book>(`/api/books/${ this.selectedBook._id}`, book);
  }
}

