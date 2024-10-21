import { Injectable } from '@angular/core';
import { Book } from './book';

const minRating = 1;
const maxRating = 5;

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  static rateUp(book: Book): Book {
    if(book.rating >= maxRating) {
      return book;
    }

    return {
      ...book,
      rating: book.rating + 1
    } as Book
  }

  static rateDown(book: Book): Book {

    if(book.rating <= minRating) {
      return book;
    }

    return {
      ...book,
      rating: book.rating - 1
    } as Book
  }
}
