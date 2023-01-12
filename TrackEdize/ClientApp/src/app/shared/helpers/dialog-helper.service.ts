import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class DialogHelperService {

  constructor(private messageService: MessageService) { }

  // showProjectConfirm(id: string | undefined) {
  //   this.messageService.clear();
  //   this.messageService.add({
  //     key: 'project',
  //     sticky: true,
  //     severity: 'warn',
  //     summary: 'Confirmation',
  //     detail: 'Are you sure that you want to delete this project?',
  //     closable: false,
  //     data: id,
  //   });
  // }

  // showIssueConfirm(id: string | null) {
  //   this.messageService.clear();
  //   this.messageService.add({
  //     key: 'issue',
  //     sticky: true,
  //     severity: 'warn',
  //     summary: 'Confirmation',
  //     detail: 'Are you sure that you want to delete this issue?',
  //     closable: false,
  //     data: id,
  //   });
  // }
}
