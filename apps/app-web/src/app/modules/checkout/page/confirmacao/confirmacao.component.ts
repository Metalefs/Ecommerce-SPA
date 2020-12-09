import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { fade } from 'apps/app-web/src/app/animations';
import { EditarOrcamentoLocal, EditarProdutoOrcamentoLocal, LerOrcamento, RemoverProdutoOrcamento, ResetarOrcamento } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { removeDuplicates } from 'apps/app-web/src/app/helper/ObjHelper';
import { Orcamento, Produto, Usuario } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { Observable, pipe } from 'rxjs';
@Component({
  selector: 'personalizados-lopes-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss'],
  animations:[fade]
})
export class ConfirmacaoComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  ProdutoTable:MaterialTable;
  ErroCadastro:boolean = false;
  Total:number = 0;
  @Input() edit = true;
  constructor(private store:Store,private snack: MatSnackBar) { }

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

      if(x.Status == StatusOrcamento.enviado){
        this.snack.open("Orçamento já foi enviado! Responderemos em até 48 horas.", "Fechar").afterOpened().subscribe(x=>{
          this.store.dispatch(new ResetarOrcamento());
        });
      }
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
    this.EditarOrcamento(element)
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
    this.Orcamento$.subscribe(x=>{
      let Produtos =  x.Produto;
      let DistinctProdutos:Produto[] = removeDuplicates(Produtos,"_id");
      this.Total = DistinctProdutos.map(x=>x.Preco * x.Quantidade).reduce((total, num)=>{return total + num});
    })
    if(produto.Preco)
      return parseInt(produto.Preco.toString()) * parseInt(produto.Quantidade.toString());
    return 0;
  }

}
