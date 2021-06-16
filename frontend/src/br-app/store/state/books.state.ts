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
export const getAllGenres = createSelector(getBooks, (books) => {
   const genres: string[] = [];
   for (const book of books) {
       if ( !genres.includes(book.genres) ) {
           genres.push(book.genres);
       }
   }
   return genres;
});
export const getSortedBooks = createSelector(getBooks, (books) => {
    const booksClone: Book[] = [...books].sort( (a, b) => {
        return b.rate - a.rate;
    });
    return booksClone;
});


