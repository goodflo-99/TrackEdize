import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common/base-service';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService<Project> {

  constructor(public http: HttpClient) {
    super(http);
    this.api = 'http://localhost:5294/api/project';
  }

  // getAll() {
  //   var res = this.http.get<Project[]>(this.api+'');
  //   console.log(res);
  //   return res;
  // }

  // getById(id: string) {
  //   var res = this.http.get<Project>(this.api+'/'+id);
  //   console.log(res);
  //   return res;
  // }

  // add(issue: Project) {
  //   return this.http.post<Project>(this.api, issue);
  // }

  // update(issue: Project) {
  //   return this.http.put<Project>(this.api, issue);
  // }

  // delete(id: string) {
  //   var res = this.http.delete(this.api+'/'+id);
  //   console.log(res);
  //   return res;
  // }
}
