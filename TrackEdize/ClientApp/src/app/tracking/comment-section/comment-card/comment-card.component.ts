import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../models/comment';

@Component({
  selector: 'comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  @Input()
  comment: Comment

  @Output()
  editComment = new EventEmitter<Comment>();

  @Output()
  deleteComment = new EventEmitter<string>();

  editMode: boolean = false;

  comForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { 
    this.comment = new Comment();
  }

  ngOnInit(): void {
  }

  toggleMode() {
    if(!this.editMode) {
      this.initForm();
    } else {
      if(this.comForm.touched && this.comForm.dirty) {
        this.editComment.emit(this.comment);
      }
    }
    this.editMode = !this.editMode;
  }

  delete() {
    this.deleteComment.emit(this.comment.id);
  }

  initForm() {
    this.comForm = this.fb.group({
      text: null
    })
  }
}
