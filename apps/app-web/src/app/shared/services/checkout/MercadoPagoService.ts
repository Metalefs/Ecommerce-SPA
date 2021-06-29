import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandler } from '../../../core/error.handler';
import { environment } from '../../../../environments/environment';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { Integracoes, Orcamento, Produto } from 'libs/data/src/lib/classes';
import { MercadoPagoCheckout, MercadoPagoSearchPaymentResult, mp_checkout_items, mp_checkout_payer, mp_payment_methods, mp_shipments } from 'libs/data/src/lib/interfaces';


import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { MercadoPagoPayment, mp_payment_additional_info, mp_shipping } from 'libs/data/src/lib/interfaces/mercadoPagoCheckout';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoCheckoutService {
  constructor(private http: HttpClient,
    private ErrorHandler: ErrorHandler,
    private AuthenticationService: AuthenticationService) { }

  listPayments() {
    let payload = this.AuthenticationService.tokenize({});
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
