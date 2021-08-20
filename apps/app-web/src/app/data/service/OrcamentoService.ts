import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { entities } from '@personalizados-lopes/data';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../../core/error.handler';
import { BaseService } from './base/base.service';
import { Orcamento } from 'libs/data/src/lib/classes';

@Injectable({
  providedIn: 'root'
})

export class OrcamentoService extends BaseService<Orcamento> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler) {
    super(RouteDictionary.Orcamento.Padrao,HttpClient,ErrorHandler)
  }

  FiltrarOrcamentosPorUsuario(): Observable<entities.Orcamento[]> {
    return this.http.get<entities.Orcamento[]>(environment.endpoint + RouteDictionary.Orcamento.PorUsuario).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }
  InserirOrcamentoEmail(item: any){
    return this.http.post<Orcamento>(environment.endpoint + RouteDictionary.Orcamento.PadraoEmail, {item}).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }
}
