import { Book } from '../../shared/book';
import { BookActions } from './book.actions';
import { reducer, initialState } from './book.reducer';

fdescribe('Book Reducer', () => {
  describe('an unknown action', () => {

    it('should set loading flag to `true` on loadbook action', () => {
      const action = BookActions.loadBooks();
      const newState = reducer(initialState, action);
      expect(newState.loading).toBeTrue();
    });

    it('should set books on loadBookSuccess', () => {
      const newBooks: Book[] = [];
      const action = BookActions.loadBooksSuccess({ books: newBooks });
      // manually defining initialState
      const oldState = { books: [], loading: true };
      const newState = reducer(oldState, action);
      expect(newState.loading).toBeFalsy();
      expect(newState.books).toBe(newBooks);
    });


    // handsOn
    // 1.teste den reducer, der auf die create action reagiert
    it('should add a new book to books', () => {
      const oldBookList: Book[] = [];
      const newBook:Book = {
        isbn: '098203',
        title:'test leicht gemacht',
        description:'-',
        price: 12,
        rating:3
      };
      const action = BookActions.create({ book: newBook });
      const oldState = { books: oldBookList, loading: false };
      const newState = reducer(oldState, action);
      // tests
      expect(newState.loading).toBeFalse();
      expect(oldState.books.length).toBeLessThan(newState.books.length);
    });
    // 2 "...." ratingUp reagiert
    it('should rateUp a book', () => {
      const testBook:Book = {
        isbn: '098203',
        title:'test leicht gemacht',
        description:'-',
        price: 12,
        rating:3
      };
      const testBookList: Book[] = [testBook];
      //
      const action = BookActions.rateUp({ book: testBook });
      // state
      const oldState = { books: testBookList, loading: false };
      const newState = reducer(oldState, action);
      // tests
      expect(newState.loading).toBeFalse();
      expect(newState.books[0].rating).toBe(4);
    });
  });
});
