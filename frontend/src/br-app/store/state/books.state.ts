import { Book } from "../../models/books";
import { createFeatureSelector, createSelector } from "@ngrx/store";
export const BOOKS_FEATURE_NAME = "books";

export interface BooksState {
    books: Book[];
    booksForRec: Book[];
}

export const initialBooksState = {
    books: [],
    booksForRec: [],
};

const getFeature = createFeatureSelector<BooksState>(BOOKS_FEATURE_NAME);

export const getBooks = createSelector(getFeature, (state) => state.books);
export const getBooksForRec = createSelector(getFeature, (state) => state.booksForRec);
export const getSortedBooks = createSelector(getBooksForRec, (books) => {
    const booksClone: Book[] = [...books].sort( (a, b) => {
        return b.rate - a.rate;
    });
    return booksClone;
});



