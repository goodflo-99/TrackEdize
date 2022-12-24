import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common/base-service';
import { Issue } from '../models/issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService extends BaseService<Issue> {

  constructor(public http: HttpClient) {
    super(http);
    this.api = 'http://localhost:5294/api/issue';
  }

  // getAll() {
  //   var res = this.http.get<Issue[]>(this.api+'');
  //   console.log(res);
  //   return res;
  // }

  // getById(id: string) {
  //   var res = this.http.get<Issue>(this.api+'/'+id);
  //   console.log(res);
  //   return res;
  // }

  // add(issue: Issue) {
  //   return this.http.post<Issue>(this.api, issue);
  // }

  // update(issue: Issue) {
  //   return this.http.put<Issue>(this.api, issue);
  // }

  // delete(id: string) {
  //   var res = this.http.delete(this.api+'/'+id);
  //   console.log(res);
  //   return res;
  // }

}
