import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';

import { BookComponent } from '../book/book.component';
import { Book } from '../../shared/book';
import { BookRatingService } from '../../shared/book-rating.service';
import { BookStoreService } from '../../shared/book-store.service';
import { MatButtonModule } from '@angular/material/button';
import { BookFormComponent } from "../book-form/book-form.component";
import { B } from '@angular/cdk/keycodes';
import { switchMap } from 'rxjs';

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
  private rs: BookRatingService = inject(BookRatingService);
  private bs = inject(BookStoreService);
  // signals
  books: WritableSignal<Book[]> = signal<Book[]>([]);
  currentBook = signal<Book | undefined>(undefined);
  // 2. weg (convert to signal) für migration geeignet. am besten nicht verwenden.
  // books$ = this.bs.getAllBooks();
  // books = toSignal(this.books$, {initialValue: []})

  // vars
  toggleForm: boolean = false;

  constructor() {
    this.bs.getAllBooks().subscribe(books => this.books.set(books));
  }

  showFirstBook() {
    alert(this.books()[0]?.title);
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateAndSortList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateAndSortList(ratedBook);
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

    this.books.update(books => books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating));

    // TODO: buch zum serve senden (Hausaufgabe)
  }

  toggle() {
    this.toggleForm = !this.toggleForm;
  }


  addBook(book: Book) {
    this.books.update(books => [...books,book])
  }

  changeToEditMode(book: Book) {
    this.currentBook.set(book);
    this.toggleForm = true;
  }

  changeBook(cBook: Book) {
    // this.updateAndSortList(cBook);
    this.currentBook.set(undefined);

    this.bs.updateBook(cBook)
    .pipe(switchMap(_ => this.bs.getAllBooks()))
    .subscribe(books => this.books.set(books));
  }
}
