import { Component, Input, OnInit } from '@angular/core';
import { sum } from 'apps/app-web/src/app/helper/ObjHelper';
import { Produto } from 'libs/data/src/lib/classes';
import { Select } from '@ngxs/store';
import { OrcamentoState } from '../../../../../data/store/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-avaliacao-estrelas-produto',
  templateUrl: './avaliacao-estrelas-produto.component.html',
  styleUrls: ['./avaliacao-estrelas-produto.component.scss']
})
export class AvaliacaoEstrelasProdutoComponent implements OnInit {
  @Select(OrcamentoState.ObterProdutoAberto) Produto$: Observable<Produto>;
  Produto:Produto;
  constructor() { }

  ngOnInit(): void {
    this.Produto$.subscribe(produto=>{
      this.Produto = produto;
    })
  }
  meanRating(){
    if (!this.Produto.Rating)
    return 0;
    return (sum(this.Produto?.Rating||0) / this.Produto.Rating?.length||0).toFixed(1)
  }
}
