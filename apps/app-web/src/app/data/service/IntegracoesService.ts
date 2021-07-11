import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';

import { ErrorHandler } from '../../core/error.handler';
import { Integracoes } from 'libs/data/src/lib/classes';
import { BaseService } from './base/base.service';
@Injectable({
  providedIn: 'root'
})

export class IntegracoesService extends BaseService<Integracoes> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler) {
    super(RouteDictionary.Integracoes.Raiz,HttpClient,ErrorHandler)
  }
  ObterChavePublicaMercadoPago(): Observable<entities.Integracoes> {
    return this.HttpClient.get<entities.Integracoes>(environment.endpoint + RouteDictionary.Integracoes.ChavePublicaMercadoPago).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }
}
