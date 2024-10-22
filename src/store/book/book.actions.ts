import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../../shared/book';
import { HttpErrorResponse } from '@angular/common/http';

export const BookActions = createActionGroup({
  source: 'Book',
  events: {
    'Load Books': emptyProps(),
    'Load Books Success': props<{ books: Book[] }>(),
    'Load Books Failure': props<{ error: HttpErrorResponse }>(),

    'Rate Up': props<{ book: Book }>(),
    'Rate Down': props<{ book: Book }>(),

    'Rate Up Service': props<{ book: Book }>(),  // Success action for rateUp
    'Rate Down Service': props<{ book: Book }>(),  // Success action for rateDown

    'Create': props<{ book: Book }>(),
  }
});
