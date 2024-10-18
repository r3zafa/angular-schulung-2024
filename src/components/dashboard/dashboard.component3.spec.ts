import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Book } from '../../shared/book';
import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';
import { BookStoreService } from '../../shared/book-store.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

// 2. strategie -- mit spionen antworten manipulieren
fdescribe('DashboardComponent - spayOn', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideHttpClient(), provideHttpClientTesting]
    }).compileComponents();
  });

  it('should show the title of the books',()=> {
    const books: Book[] = [{ isbn: '', title: 'Hallo Hannover', description: 'test', rating: 5, price: 1 } as Book]
    const bs = TestBed.inject(BookStoreService);
    spyOn(bs,'getAllBooks').and.returnValue(of(books));

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.books()[0].title).toBe('Hallo Hannover')
  })

});
