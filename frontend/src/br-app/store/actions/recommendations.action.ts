import { createAction, props } from "@ngrx/store";
import { Book, BooksRecommended } from "../../models/books";

export const addTags = createAction(
    "[Recommendations] tags added",
    props<{ tags: string[], selectedBooks: Book[] }>(),
);
export const getRecommendations = createAction(
    "[Recommendations] get recommendations",
);
export const getRecommendationsSuccess = createAction(
    "[Recommendations] get recommendations success",
    props<{ booksRecommended: BooksRecommended[] }>(),
);
