import { createFeature, createReducer, on } from '@ngrx/store';
import { BookActions } from './book.actions';
import { Book } from '../../shared/book';

export const bookFeatureKey = 'book';

export interface State {
  book: Book[],
  loading:boolean
}

export const initialState: State = {
  book: [],
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(BookActions.loadBooks, state => state),
  on(BookActions.loadBooksSuccess, (state, action) => state),
  on(BookActions.loadBooksFailure, (state, action) => state),
);

export const bookFeature = createFeature({
  name: bookFeatureKey,
  reducer,
});

