import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Produto } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LerProduto } from '../../../data/store/actions/produto.actions';
import { ProdutoState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;
  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;

  ProdutoToBeUpdated: Produto;

  isUpdateActivated = false;

  areProdutosLoadedSub: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
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
    if(isPlatformBrowser(this.platform)){
      setTimeout(()=>document.querySelector(".eapps-link").remove(),5000)
    }
  }

  ngOnDestroy(){
    this.areProdutosLoadedSub.unsubscribe();
  }
}
