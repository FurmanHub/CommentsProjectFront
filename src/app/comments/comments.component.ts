import {Component, OnInit} from '@angular/core';
import { NgForOf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comments',
  standalone: true,
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  imports: [CommonModule, NgForOf, FormsModule]
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  paginatedComments: Comment[] = [];
  newMainComment: Comment = { userName: '', email: '', text: '' };
  replyText: string = '';
  selectedComment: Comment | null = null;

  currentPage: number = 1;
  totalPages: number = 10;
  commentsPerPage: number = 5; // Количество комментариев на странице

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  // TODO: Add total pages return on backend
  loadComments(): void {
    this.commentService.getComments(this.currentPage, this.commentsPerPage).subscribe(comments => {
      this.comments = comments;
      this.totalPages = 10
      this.paginatedComments = comments;
    });
  }

  addMainComment(): void {
    this.commentService.addComment(this.newMainComment).subscribe(comment => {
      this.comments.push(comment);
      this.newMainComment = { userName: '', email: '', text: '' }; // сброс формы
      this.loadComments();
    });
  }

  addReply(comment: Comment): void {
    const reply: Comment = { userName: '', email: '', text: this.replyText };
    this.commentService.addReply(comment.id!, reply).subscribe(() => {
      this.selectedComment = null;
      this.replyText = '';
      this.loadComments();
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadComments();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadComments();
    }
  }

  toggleReply(comment: Comment): void {
    this.selectedComment = this.selectedComment === comment ? null : comment;
  }

  sortBy(key: keyof Comment): void {
    this.comments.sort((a: Comment, b: Comment) => {
      const aValue = a[key] !== undefined ? a[key] : '';
      const bValue = b[key] !== undefined ? b[key] : '';

      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });
  }
}
