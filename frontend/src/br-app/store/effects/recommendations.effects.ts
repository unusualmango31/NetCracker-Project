import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { pipe } from "rxjs";
import { getRecommendations, getRecommendationsSuccess } from "../actions/recommendations.action";
import { RecommendationsService } from "../../services/recommendations.service";

@Injectable({ providedIn: "root" })
export class RecommendationsEffects {
    makeRecommendation$ = createEffect(() => this.actions$.pipe(
        ofType(getRecommendations),
        mergeMap((action) => {
            return this.recommendationsService.getRecommendations();
        }),
        pipe(
            map((books) => getRecommendationsSuccess( { booksRecommended: books }) ),
        ),
    ));

    constructor(
        private actions$: Actions,
        private recommendationsService: RecommendationsService,
    ) {
    }
}
