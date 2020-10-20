import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';


@Injectable({
    providedIn: 'root'
})

export class ClienteService {
    constructor(private http: HttpClient,
        private AuthenticationService: AuthenticationService) { }

    Ler(): Observable<entities.Cliente[]> {
        return this.http.get<entities.Cliente[]>(environment.endpoint + RouteDictionary.Cliente).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
    }

    Editar(item: entities.Cliente): Observable<entities.Cliente> {
        let payload = this.AuthenticationService.tokenize({Cliente:item});
        console.log(payload);
        return this.http.put<entities.Cliente>(environment.endpoint + RouteDictionary.Cliente,
            payload).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
    }

    Remover(id: string): Observable<any>{
      let token = this.AuthenticationService.tokenize({id});
      return this.http.delete<entities.Cliente>(environment.endpoint + RouteDictionary.Cliente + `?id=${id}&token=${token.token}`).pipe(
          retry(3),
          catchError(this.handleError)
      );
    }

    Incluir(item: entities.Cliente): Observable<any> {
      let payload = this.AuthenticationService.tokenize({Cliente:item});
      return this.http.post<entities.Cliente>(environment.endpoint + RouteDictionary.Cliente, payload).pipe(
          retry(3),
          catchError(this.handleError)
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
