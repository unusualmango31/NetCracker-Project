import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Book, BooksRecommended } from "../../models/books";

export const RECOMMENDATIONS_FEATURE_NAME = "recommendations";

export interface RecommendationsState {
    booksRecommended: BooksRecommended[];
    selectedBooks: Book[];
    tags: string[];
}

export const initialRecommendationsState = {
    booksRecommended: [],
    selectedBooks: [],
    tags: [],
};

const getFeature = createFeatureSelector<RecommendationsState>(RECOMMENDATIONS_FEATURE_NAME);
export const getSelectedBooks = createSelector(getFeature, (state) => state.selectedBooks);
export const getRecommendedBooks = createSelector(getFeature, (state) => state.booksRecommended);
export const getTags = createSelector(getFeature, (state) => state.tags);
export const getSortedRecommendedBooks = createSelector(getRecommendedBooks, (books) => {
    const booksClone: BooksRecommended[] = [...books].sort( (a, b) => {
        return b.coefficient - a.coefficient;
    });
    return booksClone;
});
