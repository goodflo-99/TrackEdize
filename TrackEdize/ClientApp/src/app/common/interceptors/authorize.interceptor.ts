import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeInterceptor implements HttpInterceptor {
  constructor(private jwtSvc: JwtHelperService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = localStorage.getItem("jwt");
    return this.processRequestWithToken(token, req, next);
  }

  private processRequestWithToken(token: string | null, req: HttpRequest<any>, next: HttpHandler) {
    if (!!token && !this.jwtSvc.isTokenExpired(token)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}
