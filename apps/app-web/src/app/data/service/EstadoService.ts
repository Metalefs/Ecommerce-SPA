import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Estado } from '../models/Estado';
import { ErrorHandler } from '../../core/error.handler';
@Injectable({
    providedIn: 'root'
})

export class EstadoService {
    constructor(private http: HttpClient, private ErrorHandler:ErrorHandler){}

    Listar(): Observable<Estado[]> {
        // alert(`https://viacep.com.br/${cep}/json`);
        // let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

        return this.http.get<Estado[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/`).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.ErrorHandler.handleError) // then handle the error
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
