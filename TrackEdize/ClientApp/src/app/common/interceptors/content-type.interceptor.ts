import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.headers.has('Content-Type')) {
      var contentType = request.headers.get('Content-Type');
      request = request.clone({
        setHeaders: {
          'Content-Type': contentType == 'application/text' ? 'application/json' : (contentType ?? 'application/json')
        }
      })
    }
    return next.handle(request);
  }
}
