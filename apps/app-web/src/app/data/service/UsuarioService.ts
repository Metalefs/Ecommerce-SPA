import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { retry, catchError } from 'rxjs/operators';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { ErrorHandler } from '../../core/error.handler';
import { TrocaSenha } from 'libs/data/src/lib/interfaces';
@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService,
    private ErrorHandler: ErrorHandler
  ) { }

  AtualizarInformacoes(item: entities.Usuario): Observable<entities.Usuario> {
    let payload = this.authenticationService.tokenize({ Usuario: item });
    console.log(payload);
    return this.http.put<entities.Usuario>(environment.endpoint + RouteDictionary.Usuario.AtualizarConta,
      payload).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.ErrorHandler.handleError) // then handle the error
      );
  }
  TrocarSenha(trocaSenha: TrocaSenha): Observable<entities.Usuario> {
    let payload = this.authenticationService.tokenize({ TrocaSenha: trocaSenha });
    console.log(payload);
    return this.http.put<entities.Usuario>(environment.endpoint + RouteDictionary.Usuario.TrocarSenha,
      payload).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.ErrorHandler.handleError) // then handle the error
      );
  }
  RecoverPassword(email: string): any {
    return this.http.post<string>(environment.endpoint + RouteDictionary.Usuario.RecuperarSenha, { email: email }).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }
  DeleteAccount(id: string): any {
    return this.http.delete<entities.Usuario>(environment.endpoint + RouteDictionary.Usuario.DeletarConta + `/${id}`).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }
}
