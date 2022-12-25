import { HttpClient, HttpParams } from '@angular/common/http';
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


  getByProjectId(id: string) {
    var params = new HttpParams().set("id", id);
    var res = this.http.get<Issue[]>(this.api+'/GetByProject'+id, { params: params});
    console.log(res);
    return res;
  }

}
