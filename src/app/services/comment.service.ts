import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/comments'; // URL для взаимодействия с бэкендом

  constructor(private http: HttpClient) {}

  // Получение комментариев с пагинацией
  getComments(limit: number = 10, page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}&page=${page}`);
  }

  // Создание нового комментария
  createComment(commentData: any): Observable<any> {
    return this.http.post(this.apiUrl, commentData);
  }

  // Редактирование комментария
  updateComment(id: number, commentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, commentData);
  }
}
