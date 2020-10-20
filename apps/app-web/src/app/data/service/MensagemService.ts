
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { Mensagem } from 'libs/data/src/lib/classes';


@Injectable({
    providedIn: 'root'
})

export class MensagemService {
    constructor(private http: HttpClient,
        private AuthenticationService: AuthenticationService) { }

    Ler(): Observable<entities.Mensagem[]> {
        return this.http.get<entities.Mensagem[]>(environment.endpoint + RouteDictionary.Mensagem).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
    }

    Editar(item: entities.Mensagem): Observable<Mensagem> {
        let payload = this.AuthenticationService.tokenize({Mensagem:item});
        console.log(payload);
        return this.http.put<entities.Mensagem>(environment.endpoint + RouteDictionary.Mensagem,
            payload).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
    }
    Remover(id: string): Observable<any>{
      let token = this.AuthenticationService.tokenize({id});
      return this.http.delete<entities.Mensagem>(environment.endpoint + RouteDictionary.Mensagem + `?id=${id}&token=${token.token}`).pipe(
          retry(3),
          catchError(this.handleError)
      );
    }
    Incluir(item: entities.Mensagem): Observable<any> {
      let payload = this.AuthenticationService.tokenize({Mensagem:item});
      return this.http.post<entities.Mensagem>(environment.endpoint + RouteDictionary.Mensagem, payload).pipe(
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
