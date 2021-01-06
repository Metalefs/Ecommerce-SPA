import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandler } from '../../../core/error.handler';
import { environment } from '../../../../environments/environment';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { Integracoes, Orcamento, Produto } from 'libs/data/src/lib/classes';
import { MercadoPagoCheckout, MercadoPagoSearchPaymentResult, mp_checkout_items, mp_checkout_payer, mp_payment_methods, mp_shipments } from 'libs/data/src/lib/interfaces';


import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
@Injectable({
    providedIn: 'root'
})
export class MercadoPagoCheckoutService {
    constructor(private http: HttpClient,
      private ErrorHandler:ErrorHandler,
      private AuthenticationService:AuthenticationService){}

    listPayments(){
      let payload = this.AuthenticationService.tokenize({});
      return this.http.get<MercadoPagoSearchPaymentResult>(environment.endpoint + RouteDictionary.ListPayments + `?token=${payload.token}`).pipe(
        retry(3),
        catchError(this.ErrorHandler.handleError)
      );
    }

    goCheckout(Orcamento:Orcamento,integracoes:Integracoes): Observable<any> {
      let MercadoPagoCheckout = this.obterPreferencia(Orcamento,integracoes);
      return this.http.post<any>(environment.endpoint + RouteDictionary.Checkout, {preference:MercadoPagoCheckout}).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.ErrorHandler.handleError) // then handle the error
      );
    }

    refund(idPagamento:number): Observable<any> {
      return this.http.post<any>(environment.endpoint + RouteDictionary.Refund, {idPagamento}).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.ErrorHandler.handleError) // then handle the error
      );
    }

    obterPreferencia(orcamento:Orcamento,integracoes:Integracoes) : MercadoPagoCheckout{
      return {
        items: this.getItems(orcamento),
        payer: this.getPayer(orcamento),
        payment_methods: this.getPaymentMethod(orcamento,integracoes),
        // shipments:this.getShipments(orcamento),
        back_urls: {
          success: "https://www.personalizadoslopes.com.br/checkout/success",
          failure: "https://www.personalizadoslopes.com.br/checkout/failure",
          pending: "https://www.personalizadoslopes.com.br/checkout/pending"
        },
        statement_descriptor: integracoes.ResumoCartao,
        additional_info: '',
        auto_return: integracoes.auto_return,
        binary_mode: integracoes.binary_mode,
        client_id: parseInt(integracoes.client_id.toString()),
        collector_id: parseInt(integracoes.collector_id.toString()),
        // client_secret: "W7iVrtOZjXhy4NdHQo7kWEay30mH7TYg"
      };
    }
    getItems(orcamento:Orcamento):mp_checkout_items[]{
      let items:mp_checkout_items[] = [];

      orcamento.Produto.forEach(produto => items.push(
        {
          id: produto.Produto._id,
          title: produto.Produto.Nome,
          description: produto.Produto.Subtitulo,
          category_id: produto.Produto.Categoria.Nome,
          quantity: produto.Produto.Quantidade,
          currency_id: 'BRL',
          unit_price: produto.Produto.PrecoPromocional ?
          parseInt(produto.Produto.PrecoPromocional.toString()) :
          parseInt(produto.Produto.Preco.toString())
        }
      ))
      return items;
    }
    getPaymentMethod(orcamento:Orcamento,integracoes:Integracoes): mp_payment_methods{
      return {
        excluded_payment_methods: [
            {
                id: "bolbradesco"
            }
        ],
        excluded_payment_types: [
            {
                id: "ticket"
            }
        ],
        installments: this.getInstalments(integracoes,orcamento)
      }
    }
    getInstalments(integracoes:Integracoes,orcamento:Orcamento):number{
      let installments = integracoes.ParcelasPadrao;

      if(this.unicoProduto(orcamento))
        installments = orcamento.Produto[0].Produto.Parcelas

      return installments;
    }
    getPayer(orcamento:Orcamento):mp_checkout_payer{
      return {
        name: orcamento.Usuario.Nome,
        surname: "",
        email: orcamento.Usuario.Email,
        date_created: orcamento.Usuario.DataCriacao?.toString() ?? new Date().toString(),
        phone: {
          area_code: orcamento.Usuario.Telefone.substr(0,4),
          number: parseInt(orcamento.Usuario.Telefone.replace("(",'').replace(")",''))
        },

        identification: {
          type: "CPF",
          number: orcamento.Usuario.CPF
        },

        address: {
          street_name: orcamento.Usuario.EnderecoEntrega.Rua,
          street_number: parseInt(orcamento.Usuario.EnderecoEntrega.Numero),
          zip_code: orcamento.Usuario.EnderecoEntrega.CEP
        }
      }
    }
    getShipments(orcamento:Orcamento):mp_shipments{
      return {
        mode:'custom',
        local_pickup:false,
        dimensions:orcamento.Dimensoes,
        default_shipping_method:0,
        cost:orcamento.Preco,
        free_shipping:false,
        receiver_address: {
          zip_code: orcamento.Usuario.EnderecoEntrega.CEP,
          street_name: orcamento.Usuario.EnderecoEntrega.Rua,
          city_name: orcamento.Usuario.EnderecoEntrega.Cidade,
          state_name: orcamento.Usuario.EnderecoEntrega.Estado,
          street_number: parseInt(orcamento.Usuario.EnderecoEntrega.Numero),
          floor: orcamento.Usuario.EnderecoEntrega.Complemento,
          apartment: orcamento.Usuario.EnderecoEntrega.Complemento,
          country_name: 'Brasil',
        }
      }
    }
    unicoProduto(orcamento:Orcamento):boolean{
      return orcamento.Produto.length == 1 && (orcamento.Produto[0].Produto?.Parcelas || 0) > 0
    }
}
