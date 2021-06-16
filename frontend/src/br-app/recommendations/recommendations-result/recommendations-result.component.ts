import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { RecommendationsService } from "../../services/recommendations.service";
import { Store } from "@ngrx/store";
import { getRecommendations } from "../../store/actions/recommendations.action";
import { Book } from "../../models/books";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BooksService } from "../../services/books.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "br-recommendations-result",
  templateUrl: "./recommendations-result.component.html",
  styleUrls: ["./recommendations-result.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationsResultComponent implements OnInit, OnDestroy {
  coverUrl = "";
  page: number;
  pageSize: number;
  isLoadPossible: boolean;
  collectionSize: number;
  private destroy$ = new Subject();

  constructor(
      public recommendationsService: RecommendationsService,
      private modalService: NgbModal,
      public booksService: BooksService,
      private store$: Store,
  ) {
    this.page = 1;
    this.isLoadPossible = true;
    this.pageSize = 10;
  }
  ngOnInit(): void {
    this.store$.dispatch(getRecommendations());
    this.recommendationsService.recommendedBooks$
        .pipe(takeUntil(this.destroy$))
        .subscribe( (books) => {
          this.collectionSize = books.length;
        });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMore(): void {
    this.pageSize *= 2;
    this.collectionSize > this.pageSize ? this.isLoadPossible = true : this.isLoadPossible = false;
  }
  openModal(modalTemplateRef: TemplateRef<unknown>, selectedBook: Book): void {
    this.booksService.selectedBook = selectedBook;
    this.coverUrl = selectedBook.imgUrl ? `url(${selectedBook.imgUrl})` : "url(../../../../assets/cover.jpg)";

    this.modalService.open(modalTemplateRef, { scrollable: true, centered: true });
  }
}
