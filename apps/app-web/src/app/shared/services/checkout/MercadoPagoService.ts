import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandler } from '../../../core/error.handler';
import { environment } from '../../../../environments/environment';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { Orcamento } from 'libs/data/src/lib/classes';
import { MercadoPagoSearchPaymentResult } from 'libs/data/src/lib/interfaces';

import { AuthenticationService } from '../../../core/service/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoCheckoutService {
  constructor(private http: HttpClient,
    private ErrorHandler: ErrorHandler,
    private AuthenticationService: AuthenticationService) { }

  listPayments() {
    return this.http.get<MercadoPagoSearchPaymentResult>(environment.endpoint + RouteDictionary.ListPayments).pipe(
      retry(3),
      catchError(this.ErrorHandler.handleError)
    );
  }
  goCheckout(orcamento: Orcamento) {
    return this.http.post<any>(environment.endpoint + RouteDictionary.Checkout, { orcamento }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }
  refund(idPagamento: number): Observable<any> {
    return this.http.post<any>(environment.endpoint + RouteDictionary.Refund, { idPagamento }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.ErrorHandler.handleError) // then handle the error
    );
  }

}
