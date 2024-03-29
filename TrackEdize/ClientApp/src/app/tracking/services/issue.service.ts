import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common/base-service';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';
import { Issue } from '../models/issue';
import { Filter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class IssueService extends BaseService<Issue> {

  constructor(public http: HttpClient) {
    super(http);
    this.api = environment.apiUrl+'/issue';
  }


  getByProjectId(id: string) {
    var params = new HttpParams().set("id", id);
    var res = this.http.get<Issue[]>(this.api+'/GetByProject', { params: params});
    console.log(res);
    return res;
  }

  addComment(comment: Comment, id: string) {
    var params = new HttpParams().set("id", id);

    return this.http.post<Comment[]>(this.api+'/AddComment', comment, {
      params: params
    });
  }

  updateComment(comment: Comment, id: string) {
    var params = new HttpParams().set("id", id);

    return this.http.put<Comment[]>(this.api+'/Comment', comment, {
      params: params
    });
  }

  deleteComment(commentId: string, id: string) {
    var params = new HttpParams().set("issueId", id).set("commentId", commentId);

    return this.http.delete<Comment[]>(this.api+'/DeleteComment', {
      params: params
    });
  }

  filterIssues(filter: Filter) {
    return this.http.post<Issue[]>(this.api+'/FilterIssues', filter);
  }
}
