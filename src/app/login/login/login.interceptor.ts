/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.crearCabeceras(req)).pipe(
      tap((res: any) => {
        return res;
      }),
      catchError((err) => {
        if (err?.error?.codigo) {
          err.error;
        }
        return this.handleError(err);

      })
    );       
  }

  handleError(err: any): Observable<HttpEvent<any>> {
    switch ((<HttpErrorResponse>err).status) {
      case 401: //Si el token esta vencido o iniviaron sesión en otro dispositivo
      
        break;
      default:
        console.log('auth service => ', err);
    }
    return throwError(() => {
      return err;
    });
  }

  crearCabeceras(request: HttpRequest<any>){
    if ((request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE') && request['body']) {

      request = request.clone({
        setHeaders: {
          ...this.obtenerEncabezadosGenerales(request),
        },
        body: request.body,
      });
      return request;
    } 
    return request
  }

  private obtenerEncabezadosGenerales(request: HttpRequest<unknown>): {
    [name: string]: string | string[];
  } {

    let requestMethods = request.headers.get('Access-Control-Request-Method');
    let requestOrigins = request.headers.get('Origin');
    let requestHeaders = request.headers.get('Access-Control-Request-Headers');
    const contentType = 'application/json';

    if (!requestMethods) {
      requestMethods = '*';
    }

    if (!requestOrigins) {
      requestOrigins = '*';
    }

    if (!requestHeaders) {
      requestHeaders = '*';
    }

    return {
      'Content-Type': contentType,
      'Access-Control-Allow-Methods': requestMethods,
      'Access-Control-Allow-Origin': requestOrigins,
      'Access-Control-Allow-Headers': requestHeaders,
    };

  }

}
