import { createReducer, on } from "@ngrx/store";

import { BooksState, initialBooksState } from "../state/books.state";
import {
    getBooksFail, getBooksForRecSuccess,
    getBooksSuccess,
} from "../actions/books.action";

export const booksReducer = createReducer(
    initialBooksState,
    on(getBooksSuccess, (state, { books } ): BooksState => ({
        ...state,
        books
    })),
    on(getBooksForRecSuccess, (state, { booksForRec } ): BooksState => ({
        ...state,
        booksForRec
    })),
    on(getBooksFail, (state ): BooksState => ({
        ...state,
        books: [],
        booksForRec: [],
    })),
);
