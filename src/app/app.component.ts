import { Component } from '@angular/core';
import { DashboardComponent } from './books/dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from '../components/navbar/navbar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [DashboardComponent, RouterOutlet, NavbarComponent]
})
export class AppComponent {
  title = 'Book Rating';
}
