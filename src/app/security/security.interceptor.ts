import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
    constructor(private _router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = "8ccf6ebac6ea70f7be596b481db11255"
        request = request.clone({
            setHeaders: {
                Authorization: token
            }
        });
        return next.handle(request).pipe(
            catchError(err => {
                return throwError("unauthorized");
            }));
    }
}