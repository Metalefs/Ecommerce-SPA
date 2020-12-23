import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandler } from '../../../core/error.handler';
import { MercadoPagoCheckout } from '../../models/mercadoPagoCheckout';
import { environment } from '../../../../environments/environment';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
@Injectable({
    providedIn: 'root'
})
export class MercadoPagoCheckoutService {
    constructor(private http: HttpClient, private ErrorHandler:ErrorHandler){}

    goCheckout(MercadoPagoCheckout:MercadoPagoCheckout): Observable<any> {
      return this.http.post<any>(environment.endpoint + RouteDictionary.Checkout, {preference:MercadoPagoCheckout}).pipe(
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
