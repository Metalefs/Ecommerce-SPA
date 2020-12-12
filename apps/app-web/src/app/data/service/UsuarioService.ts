import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { retry, catchError } from 'rxjs/operators';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { handleError } from '../../core/error.handler';
@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    constructor(private http: HttpClient, private authenticationService:AuthenticationService) { }

    AtualizarInformacoes(item: entities.Usuario): Observable<entities.Usuario> {
      let payload = this.authenticationService.tokenize({Usuario:item});
      console.log(payload);
      return this.http.put<entities.Usuario>(environment.endpoint + RouteDictionary.Usuario + RouteDictionary.AtualizarConta,
      payload).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(handleError) // then handle the error
      );
    }
    RecoverPassword(email: string): any {
      return this.http.post<string>(environment.endpoint + RouteDictionary.Usuario + RouteDictionary.TrocarSenha, {email:email}).pipe(
          retry(3),
          catchError(handleError)
      );
    }
    DeleteAccount(id: string): any {
        return this.http.delete<entities.Usuario>(environment.endpoint + RouteDictionary.Usuario + RouteDictionary.DeletarConta).pipe(
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
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
