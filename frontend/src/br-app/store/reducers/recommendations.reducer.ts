import { createReducer, on } from "@ngrx/store";
import { initialRecommendationsState, RecommendationsState } from "../state/recommendations.state";
import { addTags, getRecommendations, getRecommendationsSuccess } from "../actions/recommendations.action";


export const recommendationsReducer = createReducer(
    initialRecommendationsState,
    on(addTags, (state, { tags, selectedBooks } ): RecommendationsState => ({
        ...state,
        tags,
        selectedBooks
    })),
    on(getRecommendations, (state ): RecommendationsState => ({
        ...state,
    })),
    on(getRecommendationsSuccess, (state, { booksRecommended } ): RecommendationsState => ({
        ...state,
        booksRecommended
    })),
);
