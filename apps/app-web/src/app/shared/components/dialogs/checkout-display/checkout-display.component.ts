import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { fade, slideInOut } from 'apps/app-web/src/app/animations';
import { ResetarOrcamento, EditarProdutoOrcamentoLocal, RemoverProdutoOrcamento } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { removeDuplicates } from 'apps/app-web/src/app/helper/ObjHelper';
import { Orcamento, Produto } from 'libs/data/src/lib/classes';
import { CodProduto } from 'libs/data/src/lib/classes/orcamento';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-checkout-display',
  templateUrl: './checkout-display.component.html',
  styleUrls: ['./checkout-display.component.scss'],
  animations:[fade,slideInOut]
})
export class CheckoutDisplayComponent implements OnInit {

  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  ProdutoTable:MaterialTable;
  ErroCadastro:boolean = false;
  Total:number = 0;
  constructor(private store:Store,
    private snack: MatSnackBar,
    public dialogRef: MatDialogRef<CheckoutDisplayComponent>,
    ) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{

      this.ProdutoTable = new MaterialTable();
      let Produtos =  x.Produto;
      // let DistinctProdutos = removeDuplicates(Produtos,"_id");
      // this.ProdutoTable.dataSource = DistinctProdutos;
      this.ProdutoTable.dataSource = Produtos;
      console.log(Produtos);
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

  close(){
    this.dialogRef.close();
  }

  delayClose(){
    try{
      document.getElementsByClassName("animate__animated")[0].classList.remove("animate__slideInRight")
      document.getElementsByClassName("animate__animated")[0].classList.add("animate__slideOutRight");
      setTimeout(()=>{
        this.close()
      },0);
    }
    catch(ex){this.close()}
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

  EditarOrcamento(element:CodProduto){
    this.store.dispatch(new EditarProdutoOrcamentoLocal(element.Produto,element.Produto._id,element.codOrcamento));
  }

  VerificarQuantidade($event,element){
    if($event.target.value < element.QuantidadeMinima)
      element.Quantidade = element.QuantidadeMinima;
  }

  removerProduto(Produto:CodProduto){
    this.store.dispatch(new RemoverProdutoOrcamento(Produto.Produto._id,Produto.codOrcamento)).subscribe(x=>{
      this.Orcamento$.subscribe(x=>{
        let Produtos =  x.Produto;
        // let DistinctProdutos = removeDuplicates(Produtos,"_id");
        this.ProdutoTable.dataSource = Produtos;
      })
    });
  }

  CalcularPreco(produto:CodProduto){
    this.Orcamento$.subscribe(x=>{
      let Produtos =  x.Produto;
      let index = x.Produto.findIndex(item => item.codOrcamento === produto.codOrcamento);
      let Produto = Produtos[index].Produto;
      this.Total = Produto.Preco * Produto.Quantidade;
    })
    if(produto.Produto.Preco)
      return parseInt(produto.Produto.Preco.toString()) * parseInt(produto.Produto.Quantidade.toString());
    return 0;
  }

}
