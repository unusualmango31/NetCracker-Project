import { createAction, props } from "@ngrx/store";
import { Book } from "../../models/books";


export const getBooks = createAction(
    "[Books] load books",
);

export const getBooksSuccess = createAction(
    "[Books] load books success",
    props<{ books: Book[] }>(),
);

export const getBooksForRec = createAction(
    "[Books] load books for recommendation",
);
export const getBooksForRecSuccess = createAction(
    "[Books] load books for recommendation success",
    props<{ booksForRec: Book[] }>(),
);

export const getBooksFail = createAction(
    "[Books] failed to load books",
);

export const createBook = createAction(
    "[Books] book create",
    props<{ book: Book }>(),
);
export const createBookSuccess = createAction(
    "[Books] book create success",
);

export const selectBook = createAction(
    "[Books] book selected",
    props<{ selectedBook: Book }>(),
);
export const editBook = createAction(
    "[Books] start edit book",
    props<{ book: Book }>(),
);
export const editBookSuccess = createAction(
    "[Books] edit book done",
);
export const deleteBook = createAction(
    "[Books] deleting book",
);
export const deleteBookSuccess = createAction(
    "[Books] book has been deleted",
);



