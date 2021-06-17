import { createReducer, on } from "@ngrx/store";

import { BooksState, initialBooksState } from "../state/books.state";
import {
    editBook,
    editBookSuccess,
    getBooks,
    getBooksFail,
    getBooksSuccess,
} from "../actions/books.action";

export const booksReducer = createReducer(
    initialBooksState,
    on(getBooks, (state ): BooksState => ({
        ...state,
    })),
    on(getBooksSuccess, (state, { books } ): BooksState => ({
        ...state,
        books
    })),
    on(getBooksFail, (state ): BooksState => ({
        ...state,
        books: [],
    })),
    on(editBook, (state): BooksState => ({
        ...state,
    })),
    on(editBookSuccess, (state): BooksState => ({
        ...state,
    })),
);
