import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { handleError } from '../../core/error.handler';

@Injectable({
    providedIn: 'root'
})

export class OrcamentoService {
    constructor(private http: HttpClient,
        private AuthenticationService: AuthenticationService) { }

    Ler(): Observable<entities.Orcamento[]> {
        return this.http.get<entities.Orcamento[]>(environment.endpoint + RouteDictionary.Orcamento).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(handleError) // then handle the error
        );
    }

    Editar(item: entities.Orcamento): Observable<entities.Orcamento> {
        let payload = this.AuthenticationService.tokenize({Orcamento:item});
        console.log(payload);
        return this.http.put<entities.Orcamento>(environment.endpoint + RouteDictionary.Orcamento,
            payload).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(handleError) // then handle the error
        );
    }

    Remover(id: string): Observable<any>{
      let token = this.AuthenticationService.tokenize({id});
      return this.http.delete<entities.Orcamento>(environment.endpoint + RouteDictionary.Orcamento + `?id=${id}&token=${token.token}`).pipe(
          retry(3),
          catchError(handleError)
      );
    }

    Incluir(item: entities.Orcamento): Observable<any> {
        let payload = this.AuthenticationService.tokenize({Orcamento:item});
        return this.http.post<entities.Orcamento>(environment.endpoint + RouteDictionary.Orcamento, {payload}).pipe(
            retry(3),
            catchError(handleError)
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
