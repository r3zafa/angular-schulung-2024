import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BookEffects } from './book.effects';

describe('BookEffects', () => {
  let actions$: Observable<any>;
  let effects: BookEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookEffects,
        provideMockActions(() => actions$),

        provideHttpClient(),  // NEU
        provideHttpClientTesting()  // NEU
      ]
    });

    effects = TestBed.inject(BookEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
