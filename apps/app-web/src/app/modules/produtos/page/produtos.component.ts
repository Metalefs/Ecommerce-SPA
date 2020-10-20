import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Categoria, Produto } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { fade } from '../../../animations';
import { LerCategoria } from '../../../data/store/actions/categoria.actions';
import { AdicionarFiltroProduto } from '../../../data/store/actions/filtroproduto.actions';
import { LerProduto } from '../../../data/store/actions/Produto.actions';
import { CategoriaState, ProdutoState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
  animations: [fade]
})
export class ProdutosComponent implements OnInit {
  CategoriaAtiva:Categoria = new Categoria("Todos","Todos");

  @Select(CategoriaState.ObterListaCategorias) Categorias$: Observable<Categoria[]>;
  @Select(CategoriaState.areCategoriasLoaded) areCategoriasLoaded$;
  areCategoriasLoadedSub: Subscription;

  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;
  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;
  areProdutosLoadedSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private store: Store,
    ) {


  }

  ngOnInit(): void {
    this.Atualizar();
  }

  Atualizar(){
    this.RecarregarProdutos();
    this.RecarregarCategorias();
  }

  RecarregarProdutos(){
    this.areProdutosLoadedSub = this.areProdutosLoaded$.pipe(
      tap((areProdutosLoaded) => {
        if(!areProdutosLoaded)
          this.store.dispatch(new LerProduto());
      })
    ).subscribe(value => {
      console.log(value);
    });
  }
  RecarregarCategorias(){
    this.areCategoriasLoadedSub = this.areCategoriasLoaded$.pipe(
      tap((areCategoriasLoaded) => {
        if(!areCategoriasLoaded)
          this.store.dispatch(new LerCategoria());
      })
    ).subscribe(value => {
      console.log(value);
    });
  }

  SetCategoria(categoria:Categoria){
    if(categoria == null)
      this.CategoriaAtiva = new Categoria("Todos","Todos");
    else
      this.CategoriaAtiva = categoria;

    this.store.dispatch(new AdicionarFiltroProduto(this.CategoriaAtiva)).subscribe()
  }
}
