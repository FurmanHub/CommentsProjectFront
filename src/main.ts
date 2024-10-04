import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http'; // Импортируем withFetch

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withFetch()) // Добавляем withFetch для использования Fetch API
  ]
}).catch(err => console.error(err));
