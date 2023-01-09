import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorHelperService {

  constructor() { }
  
  getBorderCardColor(type: any) {
    switch(type) {
      case "Bug": return "bug-border-card-color";
      case "Task": return "task-border-card-color";
      case "Story": return "story-border-card-color";
      default: break;
    }
    return "";
  }

  getIssueCardColor(status: any) {
    switch(status) {
      case "Bug": return "bug-card-color";
      case "Task": return "task-card-color";
      case "Story": return "story-card-color";
      default: break;
    }
    return "";
  }
}
