import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { Book } from '../../shared/book';

@Component({
  selector: 'app-book',
  standalone: true,
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe]
})
export class BookComponent {

  // signals
  book = input.required<Book>();
  mwst = input(1.19);
  priceBrutto = computed(() => this.book().price * this.mwst());

  // outputEmiter
  rateUp = output<Book>();
  rateDown = output<Book>();

  doRateUp() {
    this.rateUp.emit(this.book());
  }

  doRateDown() {
    this.rateDown.emit(this.book());
  }
}
