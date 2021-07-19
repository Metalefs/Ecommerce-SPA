import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../../core/error.handler';
import { BaseService } from './base/base.service';
import { Pedido } from 'libs/data/src/lib/classes';

@Injectable({
  providedIn: 'root'
})

export class PedidoService extends BaseService<Pedido> {

  constructor(protected HttpClient:HttpClient, protected ErrorHandler:ErrorHandler) {
    super(RouteDictionary.Pedidos.Raiz,HttpClient,ErrorHandler)
  }

  FiltrarPedidosPorUsuario(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(environment.endpoint + RouteDictionary.Pedidos.PorUsuario).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }
}
