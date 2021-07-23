import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private snack:MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            switch(err.status){
              case(400): {
                  // auto logout if 401 response returned from api
                  this.authenticationService.logout();
                  this.snack.open("Sua sessão expirou.","Ok",{
                    verticalPosition:"top",
                    duration: 5000
                  })
                  // location.reload(true);
                  break;
              }
              case(409):{
                // alert if 409 response returned from api
                this.snack.open(err.error.erro, "Ok",{
                  verticalPosition:"top",
                  duration: 5000
                });
                this.snack.open("Você já possui login?", "Ok",{
                  verticalPosition:"top",
                  duration: 5000
                })
                alert(err.error.erro);
              }
            }

            const error = err.error.message || err.statusText || err.erro;
            return throwError(error);
        }))
    }
}
