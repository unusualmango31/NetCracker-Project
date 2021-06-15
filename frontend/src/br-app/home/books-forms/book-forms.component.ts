import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { createBook, editBook } from "../../store/actions/books.action";
import { HttpClient } from "@angular/common/http";
import { BooksService } from "../../services/books.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export interface FormFields {
  name: string;
  author: string;
  year: number;
  rate: number;
  genres: string;
  description: string;
  imgUrl: string;
  tags: string;
}

@Component({
  selector: "br-book-forms",
  templateUrl: "./book-forms.component.html",
  styleUrls: ["./book-forms.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormsComponent implements OnInit, OnDestroy {
  formTitle: string;
  form: FormGroup;
  private destroy$ = new Subject();
  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private httpClient: HttpClient,
      private booksService: BooksService,
      private store$: Store,
  ) {
  }

  ngOnInit(): void {
    this.formInit();
    this.activatedRoute.url
        .pipe(takeUntil(this.destroy$))
        .subscribe( (url) => {
          if (url[1].path === "add") {
            this.formTitle = "Добавление";
          }
          if (url[1].path === "edit") {
            console.log(this.booksService.selectedBook);
            this.formTitle = "Редактирование";
            this.formSetValueFromService();
          }
        });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  formInit(): void {
    console.log("form init");
    this.form = new FormGroup({
      name: new FormControl(null,
          [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),

      author: new FormControl(null,
          [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),

      year: new FormControl(null, [Validators.min(0), Validators.max(new Date().getFullYear())]),

      rate: new FormControl(null,
          [Validators.required, Validators.min(0), Validators.max(5) ]),

      genres: new FormControl(null,
          [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),

      tags: new FormControl(null,
          [Validators.required, Validators.minLength(4 ), Validators.pattern(/([А-Яа-яёЁ ])+(,|$)/)]),

      description: new FormControl(null,
          [Validators.required, Validators.minLength(4), Validators.maxLength(500)]),

      imgUrl: new FormControl(null,
          [Validators.pattern(/^(https:\/\/)+[\s\S]*$/)]),
    });
  }
  formSetValueFromService(): void {
    if (this.booksService.selectedBook) {
      this.form.get("name").setValue(this.booksService.selectedBook.name);
      this.form.get("author").setValue(this.booksService.selectedBook.author);
      this.form.get("year").setValue(this.booksService.selectedBook.year);
      this.form.get("rate").setValue(this.booksService.selectedBook.rate);
      this.form.get("genres").setValue(this.booksService.selectedBook.genres);
      this.form.get("tags").setValue(this.booksService.selectedBook.tags);
      this.form.get("description").setValue(this.booksService.selectedBook.description);
      this.form.get("imgUrl").setValue(this.booksService.selectedBook.imgUrl);
    }
  }

  submit(): void {
    const formValue: FormFields = this.form.value;

    if (this.formTitle === "Добавление") {
      const tags = formValue.tags.split(",");
      this.store$.dispatch(createBook( { book: { ...formValue, tags } } ));
    }
    if (this.formTitle === "Редактирование") {
      if (Array.isArray(formValue.tags)) {
        // @ts-ignore
        this.store$.dispatch(editBook( { book: { ...formValue } }));
      }
      if (typeof formValue.tags === "string") {
        const tags = formValue.tags.split(",");
        this.store$.dispatch(editBook( { book: { ...formValue, tags } } ));
      }
    }
    this.router.navigate(["/home"]);
  }
  cancel(): void {
    this.form.reset();
    this.router.navigate(["/home"]);
  }

}
