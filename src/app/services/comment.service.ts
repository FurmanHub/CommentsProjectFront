import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}

  getComments(page: number, limit: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

  addReply(commentId: number, reply: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${commentId}/replies`, reply);
  }
}
