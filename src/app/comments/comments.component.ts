import { Component } from '@angular/core';
import { NgForOf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  imports: [CommonModule, NgForOf, FormsModule]
})
export class CommentsComponent {
  comments: any[] = [];
  newComment = {
    userName: '',
    email: '',
    homePage: '',
    text: ''
  };

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.getComments(); // Получаем комментарии при инициализации
  }

  getComments(): void {
    this.commentService.getComments().subscribe((data) => {
      this.comments = data; // Сохраняем полученные комментарии
      console.log(this.comments)
    });
  }

  createComment(): void {
    console.log('trying to create comment');
    this.commentService.createComment(this.newComment).subscribe((response) => {
      console.log(response)
      console.log("comment posted")
      this.comments.push(response); // Добавляем новый комментарий в список
      this.newComment = { userName: '', email: '', homePage: '', text: '' }; // Очищаем форму
    });
  }
}
