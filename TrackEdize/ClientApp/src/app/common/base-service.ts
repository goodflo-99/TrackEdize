import { HttpClient } from "@angular/common/http";

export class BaseService<T> {

  public api!: string
  constructor(public http: HttpClient) {
  }

  getAll() {
    var res = this.http.get<T[]>(this.api + '');
    console.log(res);
    return res;
  }

  getById(id: string) {
    var res = this.http.get<T>(this.api + '/' + id);
    console.log(res);
    return res;
  }

  add(entity: T) {
    return this.http.post<T>(this.api, entity);
  }

  update(entity: T) {
    return this.http.put<T>(this.api, entity);
  }

  delete(id: string) {
    return this.http.delete(this.api + '/' + id);
  }
}