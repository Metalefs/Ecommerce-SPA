import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { ErrorHandler } from '../../core/error.handler';

@Injectable({
    providedIn: 'root'
})

export class EmailNotificacaoService {
    constructor(private http: HttpClient, private ErrorHandler:ErrorHandler,
        private AuthenticationService: AuthenticationService) { }

    Ler(): Observable<entities.EmailNotificacao[]> {
        return this.http.get<entities.EmailNotificacao[]>(environment.endpoint + RouteDictionary.EmailNotificacao).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.ErrorHandler.handleError) // then handle the error
        );
    }

    Editar(item: entities.EmailNotificacao): any {
        let payload = this.AuthenticationService.tokenize({EmailNotificacao:item});
        return this.http.put<entities.EmailNotificacao>(environment.endpoint + RouteDictionary.EmailNotificacao,
            payload).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.ErrorHandler.handleError) // then handle the error
        );
    }

    Remover(id: string): Observable<any>{
      return this.http.delete<entities.EmailNotificacao>(environment.endpoint + RouteDictionary.EmailNotificacao + `/${id}`).pipe(
          retry(3),
          catchError(this.ErrorHandler.handleError)
      );
    }

    Incluir(item: entities.EmailNotificacao): Observable<any> {
      let payload = this.AuthenticationService.tokenize({EmailNotificacao:item});
        return this.http.post<entities.EmailNotificacao>(environment.endpoint + RouteDictionary.EmailNotificacao, payload).pipe(
            retry(3),
            catchError(this.ErrorHandler.handleError)
        );
    }

    handleError(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }
}
