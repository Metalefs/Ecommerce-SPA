import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Produto } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LerProduto } from '../../../data/store/actions/Produto.actions';
import { ProdutoState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {
  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;
  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;

  ProdutoToBeUpdated: Produto;

  isUpdateActivated = false;

  areProdutosLoadedSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private store: Store,
    ) {


  }

  Atualizar(){
    this.areProdutosLoadedSub = this.areProdutosLoaded$.pipe(
      tap((areProdutosLoaded) => {
        if(!areProdutosLoaded)
          this.store.dispatch(new LerProduto());
      })
    ).subscribe(value => {
      console.log(value);
    });
  }
  ngOnInit(): void {
    this.Atualizar();
  }

}
