import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Categoria, Produto } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { fade } from '../../../animations';
import { FiltroProduto } from '../../../data/models/filtroProduto';
import { OrderType } from '../../../data/models/order-type';
import { LerCategoria } from '../../../data/store/actions/categoria.actions';
import { AdicionarFiltroProduto, EditarFiltroProduto } from '../../../data/store/actions/filtroproduto.actions';
import { LerProduto } from '../../../data/store/actions/Produto.actions';
import { CategoriaState, FiltroProdutoState, ProdutoState } from '../../../data/store/state';

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
  @Select(FiltroProdutoState.ObterListaFiltroProdutos) Filtro$: Observable<Categoria>;
  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;
  areProdutosLoadedSub: Subscription;

  defaultCategory = "Todos os produtos";
  activeSearchFilter = "";
  activeOrderFilter:number = 1;

  ordertypes:OrderType[]= [
    {name:'nome (a-z)', id: 1},
    {name:'nome (z-a)', id: 2},
    {name:'maior preço', id: 3},
    {name:'menor preço', id: 4},
  ]

  constructor(
    private dialog: MatDialog,
    private store: Store,
    ) {

  }

  ngOnInit(): void {
    this.Atualizar();
    this.Filtro$.subscribe(x=>{
      this.CategoriaAtiva = x;
    })
  }

  Atualizar(){
    this.RecarregarProdutos();
    this.RecarregarCategorias();
  }

  filtroAtivo(produto:Produto){
    if(this.matchSearchFilter(produto))
      return this.CategoriaAtiva?.Nome == this.defaultCategory
            ||  this.CategoriaAtiva?.Nome == produto.Categoria.Nome;
  }

  matchSearchFilter(produto:Produto){
    return this.activeSearchFilter.length > 0 ?
     produto.Nome.toLocaleLowerCase().includes(this.activeSearchFilter.toLocaleLowerCase())
     :
     true;
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
      this.CategoriaAtiva = new Categoria(this.defaultCategory,this.defaultCategory);
    else
      this.CategoriaAtiva = categoria;

    let FiltroProduto:FiltroProduto = {
      Categoria:this.CategoriaAtiva,
      SearchFilter:this.activeSearchFilter,
      OrderFilter:this.activeOrderFilter
    };

    this.store.dispatch(new EditarFiltroProduto(FiltroProduto)).subscribe()
  }

}
