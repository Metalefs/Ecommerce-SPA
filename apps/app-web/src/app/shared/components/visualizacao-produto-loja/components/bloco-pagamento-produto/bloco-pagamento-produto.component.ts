import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { findInvalidControlsRecursiveform } from 'apps/app-web/src/app/helper/FormHelper';
import { Produto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-bloco-pagamento-produto',
  templateUrl: './bloco-pagamento-produto.component.html',
  styleUrls: ['./bloco-pagamento-produto.component.scss']
})
export class BlocoPagamentoProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  @Input() isOrcamento:boolean = false;
  @Input() Form:FormGroup;
  @Input() textoAdicionar:string;
  @Output() onAdicionarAoOrcamento:EventEmitter<any> = new EventEmitter<any>()
  @Output() onDuplicarOrcamento:EventEmitter<any> = new EventEmitter<any>()

  @Input() ErroQuantidade : Function;
  @Input() Erros: any;
  @Output() onQuantidadeChange:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  findInvalidControlsRecursive():boolean {
    return findInvalidControlsRecursiveform(this.Form)
  }
}
