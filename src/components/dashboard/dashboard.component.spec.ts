import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Book } from '../../shared/book';
import { BookRatingService } from '../../shared/book-rating.service';
import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';
import { BookStoreService } from '../../shared/book-store.service';
import { RouterTestingHarness } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    // 1. strategie -- alle abhängigkeiten durch etwas ersetzen, das ich erzeugt habe.

    const bookRatingMock = {
      rateUp: (book: Book) => book
    };

    const bookStoreMock = {
      getAllBooks: () => of([{ isbn: '', title: 'Hallo Hannover', description: '', rating: 5, price: 1 } as Book])
    }


    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{
        provide: BookRatingService,
        useValue: bookRatingMock
      }, {
        provide: BookStoreService,
        useValue: bookStoreMock
      },
    ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 1. prüfung ob dieser wert im array zu finden ist.
  it('should show the title of the books', () => {
    component.books()[0].title === 'Hallo Hannover';
  });


  // wir prüfen auch noch einmal das html, ob der wert wirklich gebunden
  // frage: wollen wir binding prüfen
  // mögliche antwort: nein wir prüfen keine bindings in unserem projekt ---> dann bitte e2e als ergänzung
  // mögliche antwort: ja, dann so:
  it('should show the title of the books in gui', () => {
    expect(fixture.nativeElement.querySelector('h2')?.textContent).toContain('Hallo Hannover');
  });

});
