import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { bookFeature } from '../store/book/book.reducer';
import { BookEffects } from '../store/book/book.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    //provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes /*, withDebugTracing()*/),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),

    provideStore(),
    provideEffects(),
    provideStoreDevtools({
      maxAge: 25, logOnly: !isDevMode(),
    }),

    // new
    provideState(bookFeature),
    provideEffects(BookEffects),
  ]
};
