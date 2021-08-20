import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { ErrorHandler } from '../../../core/error.handler';
import { environment } from 'apps/app-web/src/environments/environment';
import { Observable } from 'rxjs';
import { PrecoPrazoEvent } from 'correios-brasil/dist';
import { catchError, retry } from 'rxjs/operators';
import { Orcamento, Produto } from 'libs/data/src/lib/classes';
@Injectable({
  providedIn: 'root'
})
export class CorreiosService {

  constructor(protected http:HttpClient, protected ErrorHandler:ErrorHandler) { }

  CalcularPrecoPrazoPorCep(cep): Observable<Array<PrecoPrazoEvent>> {
    return this.http.get<Array<PrecoPrazoEvent>>(`${environment.endpoint}${RouteDictionary.Correios.Raiz}${RouteDictionary.Correios.CalcularPrecoPrazoPorCep}${cep}`).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }
  CalcularPrecoPrazoPorProduto(cep, produto:Produto): Observable<Array<PrecoPrazoEvent>> {
    return this.http.get<Array<PrecoPrazoEvent>>(`${environment.endpoint}${RouteDictionary.Correios.Raiz}${RouteDictionary.Correios.CalcularPrecoPrazoPorProduto}${produto._id}/?cep=${cep}`).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }
  CalcularPrecoPrazoPorOrcamento(idOrcamento:string): Observable<Array<PrecoPrazoEvent>> {
    return this.http.get<Array<PrecoPrazoEvent>>(`${environment.endpoint}${RouteDictionary.Correios.Raiz}${RouteDictionary.Correios.CalcularPrecoPrazoPorOrcamento}${idOrcamento}`).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }
}
