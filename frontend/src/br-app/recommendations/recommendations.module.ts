import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecommendationsComponent } from "./recommendations.component";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecommendationsResultComponent } from "./recommendations-result/recommendations-result.component";



@NgModule({
  declarations: [
    RecommendationsComponent,
    RecommendationsResultComponent,
  ],
    imports: [
        CommonModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class RecommendationsModule { }
