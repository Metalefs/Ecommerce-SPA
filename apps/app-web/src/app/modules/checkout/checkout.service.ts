import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Orcamento } from 'libs/data/src/lib/classes';
import { CodProduto } from 'libs/data/src/lib/classes/orcamento';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { EditarOrcamentoLocal } from '../../data/store/actions/orcamento.actions';
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
    private fb: FormBuilder, private store:Store) { }
  dadosForm:FormGroup;
  enderecoForm:FormGroup;

  BuildDadosForm(usuario,orcamento,registrarse){
    this.dadosForm = this.fb.group({
      nome: [{value:usuario.Nome,disabled:!!usuario.Nome}, [Validators.required ]],
      phone:[{value:usuario.Telefone,disabled:!!usuario.Telefone}, [Validators.required, Validators.minLength(11)]],
      cpf:  [{value:usuario.CPF,disabled:!!usuario.CPF}, [Validators.required, Validators.minLength(11)]],
      Mensagem:   [{value:orcamento.Mensagem,disabled:!!usuario.Mensagem}, []],
      password:   [{value:usuario.Senha,disabled:!!usuario.Senha}, []],
      registrarse:[registrarse, []],
    });
  }

  BuildEnderecoForm(orcamento){
    this.enderecoForm = this.fb.group({
      cep: [{value:orcamento.Usuario.EnderecoEntrega.CEP,disabled:!!orcamento.usario}, [Validators.required]],
      rua: [{value:orcamento.Usuario.EnderecoEntrega.Rua,disabled:!!orcamento.usario}, { disabled: true }, [Validators.required]],
      numero: [{value:orcamento.Usuario.EnderecoEntrega.Numero,disabled:!!orcamento.usario}, [Validators.required]],
      complemento: [{value:orcamento.Usuario.EnderecoEntrega.Complemento,disabled:!!orcamento.usario}, []],
      bairro: [{value:orcamento.Usuario.EnderecoEntrega.Bairro,disabled:!!orcamento.usario}, { disabled: true }, [Validators.required]],
      cidade: [{value:orcamento.Usuario.EnderecoEntrega.Cidade,disabled:!!orcamento.usario}, { disabled: true }, [Validators.required]],
      estado: [{value:orcamento.Usuario.EnderecoEntrega.Estado,disabled:!!orcamento.usario}, { disabled: true }, [Validators.required]],
    })
  }

  Validate(Orcamento:Orcamento){
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

    if(!Orcamento.Entrega.dados.precos)
      CheckoutService.erros.push(`Selecione uma opção de frete.`);


    CheckoutService.valid = CheckoutService.erros.length == 0;
  }

  AlterarOrcamentoLocal(orcamento:Orcamento){
    this.store.dispatch(new EditarOrcamentoLocal(orcamento)).subscribe(() => {
    })
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
