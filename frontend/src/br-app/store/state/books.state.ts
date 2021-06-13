import { Book } from "../../models/books";
import { createFeatureSelector, createSelector } from "@ngrx/store";
export const BOOKS_FEATURE_NAME = "books";

export interface BooksState {
    books: Book[];
}

export const initialBooksState = {
    books: [],
};

const getFeature = createFeatureSelector<BooksState>(BOOKS_FEATURE_NAME);

export const getBooks = createSelector(getFeature, (state) => state.books);


