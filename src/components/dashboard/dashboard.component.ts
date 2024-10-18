import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';

import { BookComponent } from '../book/book.component';
import { Book } from '../../shared/book';
import { BookRatingService } from '../../shared/book-rating.service';
import { BookStoreService } from '../../shared/book-store.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'k-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookComponent, MatButtonModule]
})
export class DashboardComponent {
  // injects
  private rs: BookRatingService = inject(BookRatingService);
  private bs = inject(BookStoreService);
  // signals
  books: WritableSignal<Book[]> = signal<Book[]>([]);
  // 2. weg (convert to signal) für migration geeignet. am besten nicht verwenden.
  // books$ = this.bs.getAllBooks();
  // books = toSignal(this.books$, {initialValue: []})

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
    // this.books = this.books
    //  .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
    //  .sort((a, b) => b.rating - a.rating);

  }
}
