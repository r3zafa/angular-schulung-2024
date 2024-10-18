import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Book } from '../../shared/book';
import { DashboardComponent } from './dashboard.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('DashboardComponent http mock', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    // 2. strategie für arrange -- low level apis ersetzen (http und routing)

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideHttpClient(), provideHttpClientTesting]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // prüfung ob dieser wert im array zu finden ist.
  it('should show the title of the books', () => {
    const httpMock = TestBed.inject(HttpTestingController);
    // req aus der warteschlange holen
    const req = httpMock.expectOne('http://api.angular.schule/books');

    req.flush([{ isbn: '111', title: 'Hallo Hannover', description: 'test', rating: 1, price: 1 } as Book]);

    expect(component.books()[0].title).toBe('HALLO HANNOVER')
  });


});
