import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { of, pipe } from "rxjs";
import { BooksService } from "../../services/books.service";
import {
    createBook,
    createBookSuccess, deleteBook,
    deleteBookSuccess, editBook, editBookSuccess,
    getBooks,
    getBooksFail, getBooksForRec, getBooksForRecSuccess,
    getBooksSuccess,
} from "../actions/books.action";

@Injectable({ providedIn: "root" })
export class BooksEffects {
    getBooks$ = createEffect(() => this.actions$.pipe(
        ofType(getBooks),
        switchMap(() => {
            return this.booksService.getSeveralBooks();
        }),
        pipe(
            map((res) => {
                this.booksService.collectionSize = res.collectionSize;
                return getBooksSuccess( { books: res.books });
            }),
            catchError(
                () => of(getBooksFail()),
            ),
        ),
    ));
    getBooksForRec$ = createEffect(() => this.actions$.pipe(
        ofType(getBooksForRec),
        switchMap(() => {
            return this.booksService.getBooksFromServer();
        }),
        pipe(
            map((books) => {
                return getBooksForRecSuccess( { booksForRec: books });
            }),
            catchError(
                () => of(getBooksFail()),
            ),
        ),
    ));
    createBook$ = createEffect(() => this.actions$.pipe(
        ofType(createBook),
        mergeMap((action) => {
            return this.booksService.createBook(action.book);
        }),
        pipe(
            map(() => createBookSuccess(),
        ),
    )));
    deleteBook$ = createEffect(() => this.actions$.pipe(
        ofType(deleteBook),
        mergeMap((action) => {
            return this.booksService.deleteBook();
        }),
        pipe(
            map(() => deleteBookSuccess() ),
        ),
    ));
    editBook$ = createEffect(() => this.actions$.pipe(
        ofType(editBook),
        mergeMap((action) => {
            return this.booksService.updateBook(action.book);
        }),
        pipe(
            map(() => editBookSuccess() ),
        ),
    ));

    reloadBooks$ = createEffect( () => this.actions$.pipe(
        ofType(createBookSuccess, deleteBookSuccess, editBookSuccess),
        map( () => {
            return getBooks();
        }),
    ));
    reloadBooksForRec$ = createEffect( () => this.actions$.pipe(
        ofType(createBookSuccess, deleteBookSuccess, editBookSuccess),
        map( () => {
            return getBooksForRec();
        }),
    ));
    constructor(
        private actions$: Actions,
        private booksService: BooksService,
    ) {
    }
}
