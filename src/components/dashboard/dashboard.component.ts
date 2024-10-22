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
    alert(this.books()[0]?.title + ' | #1 in the list')
  }

  toggle() {
    this.toggleForm = !this.toggleForm;
  }

  changeToEditMode(book: Book) {
    this.currentBook.set(book);
    this.toggleForm = true;
  }

  doRateUp(book: Book) {
    this.store.dispatch(BookActions.rateUpService({ book }));
  }

  doRateDown(book: Book) {
    this.store.dispatch(BookActions.rateDownService({ book }));
  }

  addBook(book: Book) {
    this.store.dispatch(BookActions.create({ book }));
  }

  updateAndSortList(ratedBook: Book) {

  }

  changeBook(cBook: Book) {

  }
}
