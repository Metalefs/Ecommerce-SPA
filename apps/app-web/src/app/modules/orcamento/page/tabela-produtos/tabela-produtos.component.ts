import { Component, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { LerOrcamento, RemoverProdutoOrcamento } from 'apps/app-web/src/app/data/store/actions/Orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { removeDuplicates } from 'apps/app-web/src/app/helper/ObjHelper';
import { Orcamento, Produto, Usuario } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-tabela-produtos',
  templateUrl: './tabela-produtos.component.html',
  styleUrls: ['./tabela-produtos.component.scss']
})
export class TabelaProdutosComponent implements OnInit {
  @Select(OrcamentoState.ObterListaOrcamentos) Orcamento$: Observable<Orcamento>;
  ProdutoTable:MaterialTable;
  constructor(private store:Store) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{

      this.ProdutoTable = new MaterialTable();
      let Produtos =  x.Produto;
      let DistinctProdutos = removeDuplicates(Produtos,"_id");
      console.log(DistinctProdutos);
      this.ProdutoTable.dataSource = DistinctProdutos;

      this.ProdutoTable.displayedColumns = [
        "Produtos",
        "Total",
        "Acoes",
      ];
    })
  }

  TOTAL(Produto){
    this.Orcamento$.subscribe(x=>{
      let lista = x.Produto.filter(item => item._id == Produto._id);
      let total = lista.map(x=>x.Quantidade).reduce((total, num)=>{return total + Math.round(num)});
      return total;
    });
  }

  removerProduto(Produto:Produto){
    this.store.dispatch(new RemoverProdutoOrcamento(Produto._id));
  }
}
