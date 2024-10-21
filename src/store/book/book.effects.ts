import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../../shared/book-store.service';
import { BookRatingService } from '../../shared/book-rating.service';


@Injectable()
export class BookEffects {

  bs = inject(BookStoreService);
  rs = inject(BookRatingService);

  loadBooks$ = createEffect(() => {
    return inject(Actions).pipe(

      ofType(BookActions.loadBooks),
      concatMap(() =>
        this.bs.getAllBooks().pipe(
          map(books => BookActions.loadBooksSuccess({ books })),
          catchError(error => of(BookActions.loadBooksFailure({ error }))))
      )
    );
  });


}
