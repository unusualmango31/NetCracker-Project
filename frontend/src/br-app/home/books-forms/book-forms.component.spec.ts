import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormsComponent } from './book-forms.component';

describe('BookFormsComponent', () => {
  let component: BookFormsComponent;
  let fixture: ComponentFixture<BookFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
