import { Book } from './book';
import { BookRatingService } from './book-rating.service';

describe('BookRatingService', () => {
  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    service = service = new BookRatingService();
    book = {
      isbn: '000',
      title: 'test',
      description: 'test book',
      rating: 4,
      price: 99.9
    }
  });

  it('should rate up a book by one', () => {
    // act
    const ratedBook = service.rateUp(book);
    //assert
    expect(ratedBook.rating).toBe(5);
  });

  it('should rate down a book by one', () => {
    // act
    const ratedBook = service.rateDown(book);
    //assert
    expect(ratedBook.rating).toBe(3);
  });


  it('should not be allowed to have a rating greater than 5', () => {
    book.rating = 5
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });

  it('should not be allowed to have a rating smaller than 1', () => {
    book.rating = 1
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(5);
  });


  it('should not mutate the book', () => {
    const frozenBook = Object.freeze(book)
    expect(()=> service.rateUp(frozenBook)).not.toThrow();
    expect(()=> service.rateDown(frozenBook)).not.toThrow();
  });


});
