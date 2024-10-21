import { createFeature, createReducer, on } from '@ngrx/store';
import {BookActions} from './book.actions';
import { Book } from '../../shared/book';
import { BookRatingService } from '../../shared/book-rating.service';

export const bookFeatureKey = 'book';

export interface State {
  books: Book[],
  loading: boolean
}

export const initialState: State = {
  books: [],
  loading: false,
  // currentBook
};

export const reducer = createReducer(
  initialState,

  on(BookActions.loadBooks, state => ({
    ...state,
    loading: true
  })),

  on(BookActions.loadBooksSuccess, (state, { books }) => ({
    ... state,
    loading: false,
    books
  })),

  on(BookActions.loadBooksFailure, state => ({
    ...state,
    loading: false,
    books: []
  })),

  on(BookActions.rateUp, (state, { book }) => ({
    ...state,
    books: state.books.map(b =>
      b === book ? { ...b, rating: b.rating + 1 } : b
    )
  })),

  on(BookActions.rateDown, (state, { book }) => ({
    ...state,
    books: state.books.map(b =>
      b === book ? { ...b, rating: b.rating - 1 } : b
    )
  })),


  on(BookActions.rateUpService, (state, { book }) => ({
    ...state,
    books: state.books.map(b =>
      b === book ? BookRatingService.rateUp(b) : b
    )
  })),

  on(BookActions.rateDownService, (state, { book }) => ({
    ...state,
    books: state.books.map(b =>
      b === book ? BookRatingService.rateDown(b) : b
    )
  }))
);

export const bookFeature = createFeature({
  name: bookFeatureKey,
  reducer,
});