import { Injectable } from '@angular/core';
import { Orcamento } from 'libs/data/src/lib/classes';
import { MercadoPagoCheckoutService } from '../../shared/services/checkout/MercadoPagoService';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  public static DadosCompleto:boolean;
  public static EnderecoCompleto:boolean;
  public static PagamentoCompleto:boolean;
  public static valid:boolean;
  public static erros:string[] = [];
  constructor(private MercadoPago:MercadoPagoCheckoutService) { }
  Validate(Orcamento){
    CheckoutService.valid = false;
    CheckoutService.erros = [];


    Orcamento.Produto.forEach(prd=>{
      if(!prd.Produto.Cor)
      CheckoutService.erros.push(`${prd.Produto.Nome} não possui cor selecionada.`);
      if(!prd.Produto.Quantidade || prd.Produto.Quantidade <= 0)
      CheckoutService.erros.push(`${prd.Produto.Nome} não possui quantidade selecionada.`);
      if(!prd.Produto.Tamanho)
      CheckoutService.erros.push(`${prd.Produto.Nome} não possui tamanho selecionado.`);
      if(!prd.Produto.Arte && (prd.Produto.Canvas))
      CheckoutService.erros.push(`${prd.Produto.Nome} não possui arte selecionada.`);
    })

    CheckoutService.valid = CheckoutService.erros.length == 0;
  }

  goCheckout(orcamento:Orcamento){
    return this.MercadoPago.goCheckout(orcamento);
  }

  getValid(){
    return CheckoutService.valid;
  }
  getErros(){
    return CheckoutService.erros;
  }
}
