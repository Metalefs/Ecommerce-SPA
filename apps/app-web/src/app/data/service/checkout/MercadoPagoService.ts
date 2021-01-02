import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandler } from '../../../core/error.handler';
import { MercadoPagoCheckout, mp_checkout_items, mp_checkout_payer, mp_payment_methods, mp_shipments } from '../../models/mercadoPagoCheckout';
import { environment } from '../../../../environments/environment';
import { RouteDictionary } from 'libs/data/src/lib/routes/api-routes';
import { Integracoes, Orcamento, Produto } from 'libs/data/src/lib/classes';
@Injectable({
    providedIn: 'root'
})
export class MercadoPagoCheckoutService {
    constructor(private http: HttpClient,
      private ErrorHandler:ErrorHandler){}

    goCheckout(Orcamento:Orcamento,integracoes:Integracoes): Observable<any> {
      let MercadoPagoCheckout = this.obterPreferencia(Orcamento,integracoes);
      return this.http.post<any>(environment.endpoint + RouteDictionary.Checkout, {preference:MercadoPagoCheckout}).pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.ErrorHandler.handleError) // then handle the error
      );
    }

    obterPreferencia(orcamento:Orcamento,integracoes:Integracoes) : MercadoPagoCheckout{
      return {
        items: this.getItems(orcamento),
        payer:this.getPayer(orcamento),
        payment_methods:this.getPaymentMethod(orcamento,integracoes),
        shipments:this.getShipments(orcamento),
        back_urls: {
          success: "https://www.personalizadoslopes.com.br/checkout/success",
          failure: "https://www.personalizadoslopes.com.br/checkout/failure",
          pending: "https://www.personalizadoslopes.com.br/checkout/pending"
        },
        statement_descriptor: integracoes.ResumoCartao,
        init_point:'https://www.personalizadoslopes.com.br/checkout/',
        sandbox_init_point:'https://www.personalizadoslopes.com.br/checkout/',
        date_created: new Date(),
        operation_type:'regular_payment',
        additional_info:'',
        auto_return: "approved",
        binary_mode: true,
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
          unit_price: parseInt(produto.Produto.Preco.toString())
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
          street_name: "Street",
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
        }
      }
    }
    unicoProduto(orcamento:Orcamento):boolean{
      return orcamento.Produto.length == 1 && (orcamento.Produto[0].Produto?.Parcelas || 0) > 0
    }
}
