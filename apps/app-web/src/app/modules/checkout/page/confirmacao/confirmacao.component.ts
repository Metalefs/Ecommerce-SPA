import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { EditarOrcamentoLocal, EditarProdutoOrcamentoLocal, LerOrcamento, RemoverProdutoOrcamento } from 'apps/app-web/src/app/data/store/actions/Orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { removeDuplicates } from 'apps/app-web/src/app/helper/ObjHelper';
import { Orcamento, Produto, Usuario } from 'libs/data/src/lib/classes';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { Observable, pipe } from 'rxjs';
@Component({
  selector: 'personalizados-lopes-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  ProdutoTable:MaterialTable;
  constructor(private store:Store) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{

      this.ProdutoTable = new MaterialTable();
      let Produtos =  x.Produto;
      let DistinctProdutos = removeDuplicates(Produtos,"_id");
      this.ProdutoTable.dataSource = DistinctProdutos;

      this.ProdutoTable.displayedColumns = [
        "Produtos",
        "Quantidade",
        "Subtotal",
      ];
    })
  }

  IncrementarQuantidade(element){
    element.Quantidade++;
    this.EditarOrcamento(element);
  }
  DecrescerQuantidade(element){
    if(element.Quantidade > element.QuantidadeMinima)
    element.Quantidade--;
    this.EditarOrcamento(element);
  }

  EditarOrcamento(element:Produto){
    this.store.dispatch(new EditarProdutoOrcamentoLocal(element,element._id));
  }

  VerificarQuantidade($event,element){
    if($event.target.value < element.QuantidadeMinima)
      element.Quantidade = element.QuantidadeMinima;
  }

  removerProduto(Produto:Produto){
    this.store.dispatch(new RemoverProdutoOrcamento(Produto._id)).subscribe(x=>{
      this.Orcamento$.subscribe(x=>{
        let Produtos =  x.Produto;
        let DistinctProdutos = removeDuplicates(Produtos,"_id");
        this.ProdutoTable.dataSource = DistinctProdutos;
      })
    });
  }

  CalcularPreco(produto:Produto){
    if(produto.Preco)
      return parseInt(produto.Preco.toString()) * parseInt(produto.Quantidade.toString());
    return 0;
  }
}
