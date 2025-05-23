
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../_services/token.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    if(token != null){
      let clone = request.clone({
        headers: request.headers.set('Authorization','Bearer '+token)
      })
      return next.handle(clone).pipe(
        catchError((error: HttpErrorResponse) => {
          if(error instanceof HttpErrorResponse && error.status === 401){
            this.tokenService.clearToken();
            this.router.navigate(['auth']).then(() => {
              // setTimeout(() => {
              //   window.location.reload();
              // }, 3000);
            })
  
          }
          return throwError(() => error);
        })
      );
    }
    return next.handle(request)
  }
}

export const tokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}
