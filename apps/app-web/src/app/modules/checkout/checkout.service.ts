import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Orcamento } from 'libs/data/src/lib/classes';
import { CodProduto } from 'libs/data/src/lib/classes/orcamento';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
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
  constructor(private MercadoPago:MercadoPagoCheckoutService,
    private fb: FormBuilder) { }
  dadosForm:FormGroup;
  enderecoForm:FormGroup;

  BuildDadosForm(usuario,orcamento,registrarse){
    this.dadosForm = this.fb.group({
      nome: [usuario.Nome, [Validators.required ]],
      phone:[usuario.Telefone, [Validators.required, Validators.minLength(11)]],
      cpf:  [usuario.CPF, [Validators.required, Validators.minLength(11)]],
      Mensagem:   [orcamento.Mensagem, []],
      password:   [usuario.Senha, []],
      registrarse:[registrarse, []],
    });
  }

  BuildEnderecoForm(orcamento){
    this.enderecoForm = this.fb.group({
      cep: [orcamento.Usuario.EnderecoEntrega.CEP, [Validators.required]],
      rua: [orcamento.Usuario.EnderecoEntrega.Rua, { disabled: true }, [Validators.required]],
      numero: [orcamento.Usuario.EnderecoEntrega.Numero, [Validators.required]],
      complemento: [orcamento.Usuario.EnderecoEntrega.Complemento, []],
      bairro: [orcamento.Usuario.EnderecoEntrega.Bairro, { disabled: true }, [Validators.required]],
      cidade: [orcamento.Usuario.EnderecoEntrega.Cidade, { disabled: true }, [Validators.required]],
      estado: [orcamento.Usuario.EnderecoEntrega.Estado, { disabled: true }, [Validators.required]],
    })
  }

  Validate(Orcamento){
    CheckoutService.valid = false;
    CheckoutService.erros = [];


    Orcamento.Produto.forEach((prd :CodProduto)=>{
      if(!prd.Produto.Cor)
      CheckoutService.erros.push(`${prd.Produto.Nome} não possui cor selecionada.`);
      if(!prd.Produto.Quantidade || prd.Produto.Quantidade <= 0)
      CheckoutService.erros.push(`${prd.Produto.Nome} não possui quantidade selecionada.`);
      if(!prd.Produto.Tamanho)
      CheckoutService.erros.push(`${prd.Produto.Nome} não possui tamanho selecionado.`);
      if(!prd.Produto.Arte && !(prd.Produto.Canvas))
      CheckoutService.erros.push(`${prd.Produto.Nome} não possui arte selecionada.`);
      if(prd.Produto.Status == StatusProduto.esgotado)
      CheckoutService.erros.push(`${prd.Produto.Nome} está esgotado.`);
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
