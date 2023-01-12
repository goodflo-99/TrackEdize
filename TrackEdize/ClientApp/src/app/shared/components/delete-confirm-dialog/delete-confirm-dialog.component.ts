import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  // selector: 'delete-confirm-dialog[detailsMessage][okMessage][rejectMessage][confirmation][key]',
  selector: 'delete-confirm-dialog[okMessage][rejectMessage][confirmation][key]',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  @Output()
  confirmation = new EventEmitter<string | undefined>();

  // @Input()
  // detailsMessage!: string;

  @Input()
  okMessage!: string;

  @Input()
  rejectMessage!: string;

  @Input()
  key!: string;

  ngOnInit(): void {
    //this.showConfirm();
  }

  
  // showConfirm() {
  //   this.messageService.clear();
  //   this.messageService.add({
  //     key: this.key,
  //     sticky: true,
  //     severity: 'warn',
  //     summary: 'Confirmation',
  //     detail: this.detailsMessage,
  //     closable: false
  //   });
  // }

  onConfirm(id: string | undefined) {
    this.messageService.clear(this.key);
    this.confirmation.emit(id);
    this.messageService.add({key: 'msgs', severity:'success', summary:'Confirmed', detail:this.okMessage});
  }

  onReject() {
    this.messageService.clear(this.key);
    this.messageService.add({key: 'msgs', severity:'info', summary:'Rejected', detail:this.rejectMessage});
  }

}
