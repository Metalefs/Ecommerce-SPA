import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { fade } from 'apps/app-web/src/app/animations';
import { EditarOrcamentoLocal, EditarProdutoOrcamentoLocal, LerOrcamento, RemoverProdutoOrcamento, ResetarOrcamento } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { getPreviewURL } from 'apps/app-web/src/app/helper/FileHelper';
import { removeDuplicates } from 'apps/app-web/src/app/helper/ObjHelper';
import { Orcamento, Produto, Usuario } from 'libs/data/src/lib/classes';
import { CodProduto } from 'libs/data/src/lib/classes/orcamento';
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
      // let DistinctProdutos = removeDuplicates(Produtos,"_id");
      // this.ProdutoTable.dataSource = DistinctProdutos;
      this.ProdutoTable.dataSource = Produtos;

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
  upload($event,produto){
    let fileNames='';
    getPreviewURL($event,fileNames,(res,name)=>{
      produto.Arte = res;
      fileNames = name;
    })

  }
  IncrementarQuantidade(element){
    element.Produto.Quantidade++;
    this.EditarOrcamento(element);
  }
  DecrescerQuantidade(element){
    if(element.Produto.Quantidade > element.Produto.QuantidadeMinima)
    element.Produto.Quantidade--;
    this.EditarOrcamento(element);
  }

  EditarOrcamento(element:CodProduto){
    this.store.dispatch(new EditarProdutoOrcamentoLocal(element.Produto,element.Produto._id,element.codOrcamento));
  }

  VerificarQuantidade($event,element){
    if($event.target.value < element.QuantidadeMinima)
      element.Quantidade = element.QuantidadeMinima;
    this.EditarOrcamento(element)
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

  CalcularPreco(produto:CodProduto){
    this.Orcamento$.subscribe(x=>{
      let preco;
      if(produto.Produto.PrecoPromocional){
        preco = produto.Produto.PrecoPromocional?produto.Produto.PrecoPromocional :produto.Produto.Preco
      }
      let Produtos =  x.Produto;
      let index = x.Produto.findIndex(item => item.codOrcamento === produto.codOrcamento);
      let Produto = Produtos[index].Produto;
      this.Total = preco * Produto.Quantidade;
    })
    if(produto.Produto.Preco){
      let preco = produto.Produto.PrecoPromocional?produto.Produto.PrecoPromocional :produto.Produto.Preco
      return parseInt(preco.toString()) * parseInt(produto.Produto.Quantidade.toString());
    }
    return 0;
  }

}
