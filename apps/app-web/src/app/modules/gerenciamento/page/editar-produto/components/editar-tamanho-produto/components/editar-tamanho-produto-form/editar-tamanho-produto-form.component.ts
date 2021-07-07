import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TamanhoProduto } from 'libs/data/src/lib/classes';
import { FaixaTamanho } from 'libs/data/src/lib/classes/tamanhoProduto';

@Component({
  selector: 'personalizados-lopes-editar-tamanho-produto-form',
  templateUrl: './editar-tamanho-produto-form.component.html',
  styleUrls: ['./editar-tamanho-produto-form.component.scss']
})
export class EditarTamanhoProdutoFormComponent implements OnInit {
  tamanhoProdutoForm: FormGroup;
  @Input() TamanhoProduto:TamanhoProduto;
  @Input() editing:boolean;

  tamanhoesProduto:TamanhoProduto[];
  faixasTamanho:FaixaTamanho[] = [];

  @Output() onSend:EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.tamanhoProdutoForm = this.fb.group({
      Nome: [this.TamanhoProduto?.Nome || '', [Validators.required]],
      Tamanhos: [this.TamanhoProduto?.Tamanhos || '', [Validators.required]],
    })
    this.tamanhoProdutoForm.valueChanges.subscribe(x=>{
      this.TamanhoProduto = this.tamanhoProdutoForm.getRawValue();
    })
    this.faixasTamanho = this.TamanhoProduto.Tamanhos;
  }
  Send(){
    this.onSend.emit(this.tamanhoProdutoForm.getRawValue())
  }
  CriarFaixaTamanhoVirtual(tamanho:string, preco:number){
    this.faixasTamanho.push({Tamanho:tamanho, Preco:preco})
    this.tamanhoProdutoForm.get('Tamanhos').setValue(this.faixasTamanho);
  }
  EditarFaixaVirtual(faixa:FaixaTamanho, tamanho:string, preco:number){
    let i = this.faixasTamanho.findIndex(x=>x == faixa);
    this.faixasTamanho[i] = {Tamanho:tamanho, Preco:preco};
    this.tamanhoProdutoForm.get('Tamanhos').setValue(this.faixasTamanho);
  }
  RemoverFaixaVirtual(faixa:FaixaTamanho){
    let i = this.faixasTamanho.findIndex(x=>x == faixa);
    this.faixasTamanho.splice(i,1);
    this.tamanhoProdutoForm.get('Tamanhos').setValue(this.faixasTamanho);
  }
}
