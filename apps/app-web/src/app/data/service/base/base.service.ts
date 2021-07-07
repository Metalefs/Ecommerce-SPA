import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { ErrorHandler } from '../../../core/error.handler';

@Injectable({
  providedIn: 'root'
})

export class BaseService<Type> {

  constructor(
    protected domain_route: string,
    protected http: HttpClient,
    protected ErrorHandler: ErrorHandler,
  ) { }

  Ler<Type>(limit?: number, skip?: number): Observable<Array<Type>> {
    return this.http.get<Array<Type>>(environment.endpoint + this.domain_route).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

  Filtrar<Type>(id: any): Observable<Array<Type>> {
    return this.http.get<Array<Type>>(environment.endpoint + this.domain_route + `${id}`).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }

  Editar<Type>(item: Type): Observable<Type> {
    return this.http.put<any>(environment.endpoint + this.domain_route,
      {item}).pipe(
        retry(3),
        catchError(this.ErrorHandler.handleError)
      )
  }

  Remover<Type>(id: string): Observable<Type> {
    return this.http.delete<Type>(environment.endpoint + this.domain_route + `${id}`).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    )
  }

  Incluir<Type>(item: any): Observable<Type> {
    return this.http.post<Type>(environment.endpoint + this.domain_route, {item}).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }
}
