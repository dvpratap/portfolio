import { Component } from '@angular/core';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactFormComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dev Pratap Singh Rajawat - Full Stack Developer';
}
