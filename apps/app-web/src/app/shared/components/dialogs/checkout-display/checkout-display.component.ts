import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { fade, slideInOut } from 'apps/app-web/src/app/animations';
import { ResetarOrcamento, EditarProdutoOrcamentoLocal, RemoverProdutoOrcamento } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { CheckoutService } from 'apps/app-web/src/app/modules/checkout/checkout.service';
import { Orcamento } from 'libs/data/src/lib/classes';
import { CodProduto } from 'libs/data/src/lib/classes/orcamento';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
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
    private checkoutService: CheckoutService
    ) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{
      this.ProdutoTable = new MaterialTable();
      let Produtos =  x.Produto;
      this.ProdutoTable.dataSource = Produtos;
      this.ProdutoTable.displayedColumns = [
        "Produtos",
        "Quantidade",
        "Subtotal",
      ];

      if(x.Status == StatusOrcamento.enviado){
        this.snack.open("Orçamento já foi enviado! Responderemos em até 48 horas.", "Fechar",{duration:3000}).afterOpened().subscribe(x=>{
          this.store.dispatch(new ResetarOrcamento());
        });
      }
    })
  }

  close(){
    this.dialogRef.close();
  }

  delayClose(off:number = 0){
    setTimeout(()=>{
      this.close()
    },off);
  }

  IncrementarQuantidade(element){
    element.Quantidade++;
    this.EditarOrcamento(element);
  }
  DecrescerQuantidade(element){
    if(element.Quantidade > element.QuantidadeMinima || element.Quantidade > 1)
    element.Quantidade--;
    this.EditarOrcamento(element);
  }

  EditarOrcamento(element:CodProduto){
    this.store.dispatch(new EditarProdutoOrcamentoLocal(element.Produto,element.Produto._id,element.codOrcamento));
    this.Orcamento$.subscribe(x=>{
      this.checkoutService.Validate(x);
    });
  }

  VerificarQuantidade($event,element){
    if($event.target.value <= element.Produto.QuantidadeMinima)
      element.Quantidade = element.Produto.QuantidadeMinima == 0 ? 1 : element.Produto.QuantidadeMinima;

    this.EditarOrcamento(element);
  }

  removerProduto(Produto:CodProduto){
    this.store.dispatch(new RemoverProdutoOrcamento(Produto.Produto._id,Produto.codOrcamento)).subscribe(x=>{
      this.Orcamento$.subscribe(x=>{
        let Produtos =  x.Produto;
        this.ProdutoTable.dataSource = Produtos;
      })
    });
  }

  CalcularPreco(produto:CodProduto){
    this.Orcamento$.subscribe(x=>{
      let Produtos =  x.Produto;
      let index = x.Produto.findIndex(item => item.codOrcamento === produto.codOrcamento);
      let Produto = Produtos[index].Produto;
      this.Total =  produto.Produto.Status == StatusProduto.promocao? produto.Produto.PrecoPromocional : produto.Produto.Preco * Produto.Quantidade;
    })
    if(produto.Produto.Preco){
      let preco =  produto.Produto.Status == StatusProduto.promocao? produto.Produto.PrecoPromocional : produto.Produto.Preco;
      return parseInt(preco.toString()) * parseInt(produto?.Produto?.Quantidade?.toString() ?? "0");
    }
    return 0;
  }


}
