import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';

import { BookComponent } from '../book/book.component';
import { Book } from '../../shared/book';
import { MatButtonModule } from '@angular/material/button';
import { BookFormComponent } from "../book-form/book-form.component";
import { Store } from '@ngrx/store';
import { selectBooks, selectBooksLoading } from '../../store/book/book.selectors';
import { BookActions } from '../../store/book/book.actions';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'k-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BookComponent,
    MatButtonModule,
    BookFormComponent,
    MatIcon
  ]
})
export class DashboardComponent {
  // injects
  protected store = inject(Store);
  // signals
  books = this.store.selectSignal(selectBooks);
  loading = this.store.selectSignal(selectBooksLoading);
  currentBook = signal<Book | undefined>(undefined);

  // vars
  toggleForm: boolean = false;

  constructor() {

  }

  showFirstBook() {

  }

  doRateUp(book: Book) {
    this.store.dispatch(BookActions.rateUpService({ book }));
  }

  doRateDown(book: Book) {
    this.store.dispatch(BookActions.rateDownService({ book }));
  }

  updateAndSortList(ratedBook: Book) {

  }

  toggle() {
    this.toggleForm = !this.toggleForm;
  }


  addBook(book: Book) {

  }

  changeToEditMode(book: Book) {
    console.log(book);
    this.currentBook.set(book);
    this.toggleForm = true;
  }

  changeBook(cBook: Book) {

  }
}
