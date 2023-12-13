import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/common/base-service';
import { Sprint } from '../models/sprint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SprintService extends BaseService<Sprint> {

  constructor(public http: HttpClient) {
    super(http);
    this.api = environment.apiUrl+'/sprint';
  }

  getByProjectId(id: string) {
    var params = new HttpParams().set("id", id);
    var res = this.http.get<Sprint[]>(this.api+'/GetByProject', { params: params});
    return res;
  }

  getOrderByProject(id: string) {
    var params = new HttpParams().set("id", id);
    var res = this.http.get<number>(this.api+'/LastSprintByProject', { params: params});
    return res;
  }
}
