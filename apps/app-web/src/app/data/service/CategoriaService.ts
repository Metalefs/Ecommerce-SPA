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

export class CategoriaService {
    constructor(private http: HttpClient,
        private AuthenticationService: AuthenticationService) { }

    Ler(): Observable<entities.Categoria[]> {
        return this.http.get<entities.Categoria[]>(environment.endpoint + RouteDictionary.Categoria).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(handleError) // then handle the error
        );
    }

    Editar(item: entities.Categoria): Observable<entities.Categoria> {
        let payload = this.AuthenticationService.tokenize({Categoria:item});
        console.log(payload);
        return this.http.put<entities.Categoria>(environment.endpoint + RouteDictionary.Categoria,
            payload).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(handleError) // then handle the error
        );
    }
    Remover(id: string): Observable<any>{
      let token = this.AuthenticationService.tokenize({id});
      return this.http.delete<entities.Categoria>(environment.endpoint + RouteDictionary.Categoria + `?id=${id}&token=${token.token}`).pipe(
          retry(3),
          catchError(handleError)
      );
    }
    Incluir(item: entities.Categoria): Observable<any> {
      let payload = this.AuthenticationService.tokenize({Categoria:item});
      return this.http.post<entities.Categoria>(environment.endpoint + RouteDictionary.Categoria, payload).pipe(
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
