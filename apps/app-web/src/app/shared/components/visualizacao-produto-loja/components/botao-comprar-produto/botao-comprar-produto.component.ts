import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { fade } from 'apps/app-web/src/app/animations';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento, Produto } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-botao-comprar-produto',
  templateUrl: './botao-comprar-produto.component.html',
  styleUrls: ['./botao-comprar-produto.component.scss'],
  animations:[fade]
})
export class BotaoComprarProdutoComponent implements OnInit {
  statusProduto=StatusProduto;
  @Input() Produto:Produto;
  @Input() textoAdicionar:string;

  @Output() onAdicionarAoOrcamento:EventEmitter<any> = new EventEmitter<any>()
  @Output() onDuplicarOrcamento:EventEmitter<any> = new EventEmitter<any>()
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;

  @Input() isOrcamento:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  produtoNoCheckout(){
    return this.Orcamento$.subscribe(x=>{
      const ProdutosOrcamento = x.Produto.filter(x=>x.Produto._id === this.Produto._id);
      if(ProdutosOrcamento?.length === 0){
        this.isOrcamento = false;
      }
      else{
        this.isOrcamento = true;
      }
    });
  }
}
