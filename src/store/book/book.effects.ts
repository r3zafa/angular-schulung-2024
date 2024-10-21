import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../../shared/book-store.service';


@Injectable()
export class BookEffects {

  bs = inject(BookStoreService);

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


  constructor(private actions$: Actions) { }
}
