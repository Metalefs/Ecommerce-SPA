import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ProdutoState } from 'apps/app-web/src/app/data/store/state';
import { ProdutoStateModel } from 'apps/app-web/src/app/data/store/state/produto.state';
import { Produto } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-comparacao',
  templateUrl: './comparacao.component.html',
  styleUrls: ['./comparacao.component.scss']
})
export class ComparacaoComponent implements OnInit {

  @Select(ProdutoState.ObterListaComparacao) Comparacao$: Observable<ProdutoStateModel>;
  Comparacao:Produto[]
  constructor() { }

  ngOnInit(): void {
    this.Comparacao$.subscribe(favorites=>{
      this.Comparacao = favorites as unknown as Produto[];
    })
  }

}
