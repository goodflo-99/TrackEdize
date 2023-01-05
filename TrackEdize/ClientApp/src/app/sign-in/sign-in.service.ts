import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class SignInService {

  private api: string = 'http://localhost:5294/api/account'

  constructor(private router: Router, private http: HttpClient,private jwtHelper : JwtHelperService) { }

  login(credentials: any) {
    return this.http.post(this.api+'/token', credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })      
    });
  }
}
