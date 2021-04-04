import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { fade, slideInOut, sliderSide } from 'apps/app-web/src/app/animations';
import { EditarOrcamentoLocal, EditarProdutoOrcamentoLocal, LerOrcamento, RemoverProdutoOrcamento, ResetarOrcamento } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { getPreviewURL } from 'apps/app-web/src/app/helper/FileHelper';
import { removeDuplicates } from 'apps/app-web/src/app/helper/ObjHelper';
import { Orcamento, Produto, Usuario } from 'libs/data/src/lib/classes';
import { CodProduto } from 'libs/data/src/lib/classes/orcamento';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { Observable, pipe } from 'rxjs';
@Component({
  selector: 'personalizados-lopes-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss'],
  animations:[fade,slideInOut]
})
export class ConfirmacaoComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  ProdutoTable:MaterialTable;
  dataSource: MatTableDataSource<CodProduto>;
  ErroCadastro:boolean = false;
  Total:number = 0;
  @Input() edit = true;
  constructor(private store:Store,private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{

      this.ProdutoTable = new MaterialTable();
      this.dataSource = new MatTableDataSource<CodProduto>(x.Produto);

      this.ProdutoTable.displayedColumns = [
        "Produtos",
        "Quantidade",
        "Subtotal",
      ];

      if(x.Status == StatusOrcamento.enviado){
        this.snack.open("Orçamento já foi enviado! Responderemos em até 48 horas.", "Fechar",{duration:5000}).afterOpened().subscribe(x=>{
          this.store.dispatch(new ResetarOrcamento());
        });
      }
    })
  }
  upload($event,produto){
    if(produto){
      let fileNames='';
      getPreviewURL($event,fileNames,(res,name)=>{
        produto.Arte = res;
        fileNames = name;
      })
    }
  }
  IncrementarQuantidade(element){
    if(element){
      element.Produto.Quantidade++;
      this.EditarOrcamento(element);
    }
  }
  DecrescerQuantidade(element){
    if(element){
      if(element.Produto.Quantidade > element.Produto.QuantidadeMinima || element.Quantidade > 1)
      element.Produto.Quantidade--;
      this.EditarOrcamento(element);
    }
  }

  EditarOrcamento(element:CodProduto){
    this.store.dispatch(new EditarProdutoOrcamentoLocal(element.Produto,element.Produto._id,element.codOrcamento));
  }

  VerificarQuantidade($event,element){
    if(element){
      element.QuantidadeMinima  = element.QuantidadeMinima== 0 ?1:element.QuantidadeMinima;
      if($event.target.value < element.QuantidadeMinima)
        element.Quantidade = element.QuantidadeMinima;
      this.EditarOrcamento(element)
    }
  }

  removerProduto(Produto:CodProduto){
    this.store.dispatch(new RemoverProdutoOrcamento(Produto.Produto._id,Produto.codOrcamento)).subscribe(x=>{
      this.Orcamento$.subscribe(x=>{
        let Produtos =  x.Produto;
        //let DistinctProdutos = removeDuplicates(Produtos,"_id");
        this.dataSource = Produtos as any;
      })
    });
  }

  CalcularPreco(produto:CodProduto){
    this.Orcamento$.subscribe(x=>{
      if(produto.Produto){
        let preco;
        let Produto;
        if(produto.Produto.PrecoPromocional){
          preco =  produto.Produto.Status == StatusProduto.promocao? produto.Produto.PrecoPromocional : produto.Produto.Preco;
        }
        let Produtos =  x.Produto;
        let index = x.Produto.findIndex(item => item.codOrcamento === produto.codOrcamento);
        if(Produtos[index])
        Produto = Produtos[index].Produto;
        if(Produto)
        this.Total = preco * Produto.Quantidade;
      }
    })
    if(produto.Produto.Preco){
      let preco = produto.Produto.Status == StatusProduto.promocao? produto.Produto.PrecoPromocional : produto.Produto.Preco;

      return (preco * produto.Produto.Quantidade).toFixed(2);
    }
    this.dataSource.data = this.dataSource.data;
    return 0;
  }

}
