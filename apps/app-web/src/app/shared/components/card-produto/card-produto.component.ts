import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { Orcamento, Produto } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { Observable } from 'rxjs';
import { fade, slideInOut } from '../../../animations';
import { AdicionarProdutoAoOrcamento, EditarProdutoOrcamentoLocal } from '../../../data/store/actions/orcamento.actions';
import { OrcamentoState } from '../../../data/store/state';
import { CheckoutDisplayComponent } from '../dialogs/checkout-display/checkout-display.component';

@Component({
  selector: 'personalizados-lopes-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.scss'],
  animations:[fade, slideInOut]
})
export class CardProdutoComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  isOrcamento:boolean;
  constructor(private store: Store,private dialog:MatDialog) { }
  @Input() Produto:entities.Produto;
  @Input() MostarOpcoes: boolean = true;
  statusProduto=StatusProduto;
  ngOnInit(): void {
  }

  AdicionarAoOrcamento(produto:Produto){
    this.Orcamento$.subscribe(x=>{

      let ProdutosOrcamento = x.Produto.filter(x=>x._id == this.Produto._id);

      if(ProdutosOrcamento.length == 0){

        this.store.dispatch(new AdicionarProdutoAoOrcamento(this.Produto));
        this.isOrcamento = true;
      }
      else{
        this.Produto.Quantidade += ProdutosOrcamento[0].Quantidade;

        this.store.dispatch(new EditarProdutoOrcamentoLocal(this.Produto,this.Produto._id));
        this.isOrcamento = true;
        this.openCheckout();
      }

    });
  }


  openCheckout(){
    this.dialog.open(CheckoutDisplayComponent, {
      restoreFocus: false,
      width:'512px',
      height:'100vh',
      position:{
        right:'0'
      },
      panelClass:['no-padding']
    });
  }
}
