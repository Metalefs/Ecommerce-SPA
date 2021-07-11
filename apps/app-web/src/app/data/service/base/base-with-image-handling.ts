import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

import { AuthenticationService } from '../../../core/service/authentication/authentication.service';

import { ErrorHandler } from '../../../core/error.handler';

import { ImagemService } from '../ImagemService';

@Injectable({
  providedIn: 'root'
})

export class BaseServiceWithImageHandling<Type> {

  constructor(
    protected domain_route: string,
    protected http: HttpClient,
    protected ErrorHandler: ErrorHandler,
    protected servicoImagem: ImagemService
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


  Incluir<Type>(item: any): Observable<Type> {
    return this.http.post<Type>(environment.endpoint + this.domain_route, {item}).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }
}
