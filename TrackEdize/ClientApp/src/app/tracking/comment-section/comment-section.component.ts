import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../models/comment';
@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  @Input()
  comments: Comment[] = [];

  @Output()
  commentAdded = new EventEmitter<Comment>()

  comment: Comment = new Comment();

  constructor() {  }

  ngOnInit(): void {
  }

  addNew() {
    // this.comments.push(this.comment);
    this.commentAdded.emit(this.comment);
    this.init();
  }

  init() {
    this.comment = new Comment();
  }

}
