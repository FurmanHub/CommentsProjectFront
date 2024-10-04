import { Component } from '@angular/core';
import { CommentsComponent } from './comments/comments.component'; // Импорт компонента комментариев

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<app-comments></app-comments>', // Используем компонент в шаблоне
  imports: [CommentsComponent] // Добавляем компонент в импорты
})
export class AppComponent {}
