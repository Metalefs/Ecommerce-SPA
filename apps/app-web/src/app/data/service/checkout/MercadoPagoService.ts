import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandler } from '../../../core/error.handler';
import { MercadoPagoCheckout, mp_checkout_items } from '../../models/mercadoPagoCheckout';
import { environment } from '../../../../environments/environment';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { Orcamento } from 'libs/data/src/lib/classes';
@Injectable({
    providedIn: 'root'
})
export class MercadoPagoCheckoutService {
    constructor(private http: HttpClient, private ErrorHandler:ErrorHandler){}

    goCheckout(Orcamento:Orcamento): Observable<any> {
      let MercadoPagoCheckout = this.obterPreferencia(Orcamento);
      return this.http.post<any>(environment.endpoint + RouteDictionary.Checkout, {preference:MercadoPagoCheckout}).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.ErrorHandler.handleError) // then handle the error
      );
    }

    obterPreferencia(orcamento:Orcamento) : MercadoPagoCheckout{
      let items:mp_checkout_items[] = [];
      orcamento.Produto.forEach(produto => items.push(
        {
          id: produto._id,
          title: produto.Nome,
          description: produto.Subtitulo,
          category_id: produto.Categoria.Nome,
          quantity: produto.Quantidade,
          currency_id: 'BRL',
          unit_price: parseInt(produto.Preco.toString())
        }
      ))
      return {
        back_urls: {
            success: "https://www.personalizadoslopes.com.br/success",
            failure: "http://www.personalizadoslopes.com.br/failure",
            pending: "http://www.personalizadoslopes.com.br/pending"
        },
        auto_return: "approved",
        binary_mode: true,
        items: items,
        payer: {
          name: orcamento.Usuario.Nome,
          surname: "",
          email: orcamento.Usuario.Email,
          date_created: orcamento.Usuario.DataCriacao.toString(),
          phone: {
            area_code: orcamento.Usuario.Telefone.substr(0,4),
            number: parseInt(orcamento.Usuario.Telefone.replace("(",'').replace(")",''))
          },

          identification: {
            type: "CPF",
            number: orcamento.Usuario.CPF
          },

          address: {
            street_name: "Street",
            street_number: parseInt(orcamento.Usuario.EnderecoEntrega.Numero),
            zip_code: orcamento.Usuario.EnderecoEntrega.CEP
          }
        }
      };
    }
}
