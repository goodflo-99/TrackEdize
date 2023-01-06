import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable()
export class AccountService {

  private api: string = environment.apiUrl+'/account'

  constructor(private router: Router, private http: HttpClient,private jwtHelper : JwtHelperService) { }

  login(credentials: any) {
    return this.http.post(this.api+'/token', credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })      
    });
  }
}
