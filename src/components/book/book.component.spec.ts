import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { Book } from '../../shared/book';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;

    // alter Still (wenn Decorator)
    // component.book = {} as Book;
    // component.book = signal({} as Book) // geht auch nicht
    // component.book.update // geht auch nicht
    fixture.componentRef.setInput('book',{} as Book);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
