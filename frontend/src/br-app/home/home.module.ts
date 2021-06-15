import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BookFormsComponent } from "./books-forms/book-forms.component";
import { BooksComponent } from "./books/books.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatIconModule } from "@angular/material/icon";



@NgModule({
  declarations: [
    HomeComponent,
    BookFormsComponent,
    BooksComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        NgbModule,
        MatIconModule,
    ],
})
export class HomeModule { }
