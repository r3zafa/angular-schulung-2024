import { Component } from '@angular/core';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from '../components/navbar/navbar.component';
import { Store } from '@ngrx/store';
import { BookActions } from '../store/book/book.actions';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [DashboardComponent, RouterOutlet, NavbarComponent]
})
export class AppComponent {
  title = 'Book Rating';

  constructor(store:Store) {
    store.dispatch(BookActions.loadBooks());
  }
}
