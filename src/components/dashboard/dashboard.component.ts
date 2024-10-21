import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';

import { BookComponent } from '../book/book.component';
import { Book } from '../../shared/book';
import { BookRatingService } from '../../shared/book-rating.service';
import { BookStoreService } from '../../shared/book-store.service';
import { MatButtonModule } from '@angular/material/button';
import { BookFormComponent } from "../book-form/book-form.component";
import { switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectBooks, selectBooksLoading } from '../../store/book/book.selectors';

@Component({
  selector: 'k-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookComponent, MatButtonModule, BookFormComponent]
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
    //const ratedBook = this.rs.rateUp(book);
    //this.updateAndSortList(ratedBook);
  }

  doRateDown(book: Book) {
    //const ratedBook = this.rs.rateDown(book);
    //this.updateAndSortList(ratedBook);
  }

  updateAndSortList(ratedBook: Book) {
    /*this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating);
    */

    /*const updatedBooks = this.books()
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating);

    this.books.set(updatedBooks);
    */

    // oder update

    //this.books.update(books => books
      //.map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      //.sort((a, b) => b.rating - a.rating));

    // TODO: buch zum serve senden (Hausaufgabe)
  }

  toggle() {
    this.toggleForm = !this.toggleForm;
  }


  addBook(book: Book) {
    //this.books.update(books => [...books,book])
  }

  changeToEditMode(book: Book) {
    //this.currentBook.set(book);
   // this.toggleForm = true;
  }

  changeBook(cBook: Book) {
    // this.updateAndSortList(cBook);
    //this.currentBook.set(undefined);

    //this.bs.updateBook(cBook)
    //.pipe(switchMap(_ => this.bs.getAllBooks()))
    //.subscribe(books => this.books.set(books));
  }
}
