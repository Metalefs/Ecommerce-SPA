import { Component, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { fade } from 'apps/app-web/src/app/animations';
import { RemoverProdutoOrcamento } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { removeDuplicates } from 'apps/app-web/src/app/helper/ObjHelper';
import { Orcamento } from 'libs/data/src/lib/classes';
import { CodProduto } from 'libs/data/src/lib/classes/orcamento';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-tabela-produtos',
  templateUrl: './tabela-produtos.component.html',
  styleUrls: ['./tabela-produtos.component.scss'],
  animations:[fade]
})
export class TabelaProdutosComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  ProdutoTable:MaterialTable;
  constructor(private store:Store) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{

      this.ProdutoTable = new MaterialTable();
      let Produtos =  x.Produto;
      // let DistinctProdutos = removeDuplicates(Produtos,"_id");
      // console.log(DistinctProdutos);
      this.ProdutoTable.dataSource = Produtos;

      this.ProdutoTable.displayedColumns = [
        "Produtos",
        "Total",
        "Acoes",
      ];
    })
  }

  removerProduto(Produto:CodProduto){
    this.store.dispatch(new RemoverProdutoOrcamento(Produto.Produto._id,Produto.codOrcamento)).subscribe(x=>{
      this.Orcamento$.subscribe(x=>{
        let Produtos =  x.Produto;
        let DistinctProdutos = removeDuplicates(Produtos,"_id");
        this.ProdutoTable.dataSource = DistinctProdutos;
      })
    });
  }
}
