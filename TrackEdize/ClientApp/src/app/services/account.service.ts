import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AccountInfo } from '../common/models/AccountInfo';

@Injectable()
export class AccountService {

  private api: string = environment.apiUrl + '/account'
  private _accountInfo: AccountInfo = new AccountInfo();

  public get accountInfo(): AccountInfo {
    return this._accountInfo;
  }
  private set accountInfo(value: AccountInfo) {
    this._accountInfo = value;
    sessionStorage.setItem("AccountInfo", JSON.stringify(value));
  }

  constructor(private router: Router, private http: HttpClient, private jwtHelper: JwtHelperService) {
    if(jwtHelper.tokenGetter() && !jwtHelper.isTokenExpired()) {
      var infoStr = sessionStorage.getItem('AccountInfo');
      if(infoStr) {
        this.accountInfo = JSON.parse(infoStr);
      } else {
        this.getAccountInfo();
      }
    }
   }

  login(credentials: any) {
    return this.http.post(this.api + '/token', credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  register(newUser: any) {
    return this.http.post(this.api + '/user', newUser, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  async getAccountInfo() {
    this.http.get<AccountInfo>(this.api + '/accountinfo').subscribe(x => {
      this.accountInfo = x;
    });
  }

  updateAccountInfo(accountInfo: AccountInfo) {
    this.http.put<AccountInfo>(this.api + '/accountinfo', accountInfo).subscribe(x => {
      this.accountInfo = x;
    });
  }
}
