import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

/**
 * This interceptor automatically adds the token header needed by our backend API if such token is present
 * in the current state of the application.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthTokenService implements HttpInterceptor {

  constructor(private _AuthService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('INTERCEPTOR');
    const token = this._AuthService.getAuthToken();
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append('authorization', `Bearer ${token}`);
    }
    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq)
    // Working in response
      // .pipe(
      //   map(resp => {
      //     if (resp instanceof HttpResponse) {
      //       console.log(resp);
      //       return resp.clone({ body: [{ title: 'Replaced data in interceptor' }] });
      //     }
      //   })
      // );
  }
}