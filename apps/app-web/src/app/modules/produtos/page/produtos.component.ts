import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Categoria, Produto } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cardFlip, fade, slideInOut } from '../../../animations';
import { FiltroProduto } from '../../../data/models/filtroProduto';
import { OrderType } from '../../../data/models/order-type';
import { LerCategoria } from '../../../data/store/actions/categoria.actions';
import { AdicionarFiltroProduto, EditarFiltroProduto } from '../../../data/store/actions/filtroproduto.actions';
import { LerProduto } from '../../../data/store/actions/produto.actions';
import { CategoriaState, FiltroProdutoState, ProdutoState } from '../../../data/store/state';
import { FiltroProdutoStateModel } from '../../../data/store/state/filtroproduto.state';
import { FiltroCategoria, FiltroCategoriaDialogComponent } from './dialogs/filtro-categoria-dialog/filtro-categoria-dialog.component';
import { FiltroOrdenacao, FiltroOrdenacaoDialogComponent } from './dialogs/filtro-ordenacao-dialog/filtro-ordenacao-dialog.component';

@Component({
  selector: 'personalizados-lopes-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
  animations: [cardFlip,fade,slideInOut]
})
export class ProdutosComponent implements OnInit {
  state = "flipped"
  defaultCategory = "Todos os produtos";
  CategoriaAtiva:Categoria;

  @Select(CategoriaState.ObterListaCategorias) Categorias$: Observable<Categoria[]>;
  @Select(CategoriaState.areCategoriasLoaded) areCategoriasLoaded$;
  areCategoriasLoadedSub: Subscription;

  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;
  @Select(FiltroProdutoState.ObterListaFiltroProdutos) Filtro$: Observable<FiltroProdutoStateModel>;
  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;
  areProdutosLoadedSub: Subscription;

  activeSearchFilter = "";
  activeOrderFilter:number = TiposOrdenacao.nome;

  loading:boolean = false;

  ordertypes:OrderType[]= [
    {name:'nome (a-z)', id: TiposOrdenacao.nome},
    {name:'nome (z-a)', id: TiposOrdenacao.nomeDesc},
    {name:'maior preço', id: TiposOrdenacao.preco},
    {name:'menor preço', id: TiposOrdenacao.precoDesc},
  ]

  constructor(
    private dialog: MatDialog,
    private store: Store,
    ) {

  }

  ngOnInit(): void {
    this.Atualizar();
    this.Filtro$.subscribe(x=>{
      if(x.Categoria)
      this.CategoriaAtiva = x.Categoria;
      else{
        this.CategoriaAtiva = new Categoria(this.defaultCategory,this.defaultCategory)
      }
      this.activeOrderFilter = x.OrderFilter;
      this.activeSearchFilter = x.SearchFilter;
    })
    setTimeout(()=>{
      this.flip()
    },0)
  }

  ngOnDestroy(){
    this.flip()
  }

  flip(){
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }

  Atualizar(){
    this.RecarregarProdutos();
    this.RecarregarCategorias();
  }

  SetCategoria(categoria:Categoria){
    this.CategoriaAtiva = categoria == null ?
    new Categoria(this.defaultCategory,this.defaultCategory)
    :
    this.CategoriaAtiva = categoria;

    this.atualizarFiltroAtivo();
  }

  AbrirDialogoCategorias(){
    this.Categorias$.subscribe(x=>{
      const dialogRef = this.dialog.open(FiltroCategoriaDialogComponent, {
        restoreFocus: false,
        width:'512px',
        data:{Categorias:x,CategoriaAtiva:this.CategoriaAtiva} as FiltroCategoria,
        height:'100vh',
        position:{
          left:'0'
        }
      });
      dialogRef.afterClosed().subscribe((result :Categoria) => {
        this.SetCategoria(result);
      });
    })
  }

  AbrirDialogoOrdenacao(){
    const dialogRef = this.dialog.open(FiltroOrdenacaoDialogComponent, {
      restoreFocus: false,
      width:'512px',
      data:{
        ordertypes:this.ordertypes,
        activeOrderFilter:this.activeOrderFilter
      } as FiltroOrdenacao,
      height:'100vh',
      position:{
        right:'0'
      }
    });
    dialogRef.afterClosed().subscribe((result :OrderType) => {
      if(result){
        this.activeOrderFilter = result.id;
        this.atualizarFiltroAtivo()
      }
    });
  }

  atualizarFiltroAtivo(){
    this.loading = true;
    this.Produtos$.subscribe(async x=>{
      switch(+this.activeOrderFilter){
        case 0:
         x = x.sort((a, b) => a.Nome.localeCompare(b.Nome));
        break;

        case TiposOrdenacao.nomeDesc:
         x = x.sort((a, b) => this.order(a,b,true));
        break;

        case TiposOrdenacao.preco:
         x = x.sort((a, b) => this.orderPreco(a,b,false));
        break;

        case TiposOrdenacao.precoDesc:
         x = x.sort((a, b) => this.orderPreco(a,b,true));
        break;
      }

      let FiltroProduto:FiltroProduto = {
        Categoria:this.CategoriaAtiva,
        SearchFilter:this.activeSearchFilter,
        OrderFilter:this.activeOrderFilter,
        Produtos: x.filter(x=>this.filtroAtivo(x)),
      };
      this.store.dispatch(new EditarFiltroProduto(FiltroProduto)).subscribe();
      await this.delay(400).then(x=>{this.loading = x;});

    })
  }
  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(false);
      }, ms);
    });
  }

  filtroAtivo(produto:Produto){
    if(this.matchSearchFilter(produto))
    return this.CategoriaAtiva?.Nome == this.defaultCategory
            ||  this.CategoriaAtiva?.Nome == produto.Categoria.Nome;
  }

  matchSearchFilter(produto:Produto){
    if(this.activeSearchFilter)
    return this.activeSearchFilter.length > 0 ?
     produto.Nome.toLocaleLowerCase().includes(this.activeSearchFilter.toLocaleLowerCase())
     :
     true;

    return true;
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

  order(a,b,desc){
    if(desc){
      if (a.Nome < b.Nome) {
        return 1;
      }
      if (a.Nome > b.Nome) {
        return -1;
      }
      // a must be equal to b
      return 0;
    }
    else{
      if (a.Nome > b.Nome) {
        return 1;
      }
      if (a.Nome < b.Nome) {
        return -1;
      }
      // a must be equal to b
      return 0;
    }
  }
  orderPreco(a,b,desc){

    if(!a.Preco)
    a.Preco = 0;

    if(!b.Preco)
    b.Preco = 0;

    if(a.Preco && b.Preco)

    if(!desc){
      if (a?.Preco < b?.Preco) {
        return 1;
      }
      if (a?.Preco > b?.Preco) {
        return -1;
      }
      // a must be equal to b
      return 0;
    }
    else{
      if (a?.Preco > b?.Preco) {
        return 1;
      }
      if (a?.Preco < b?.Preco) {
        return -1;
      }
      // a must be equal to b
      return 0;
    }
  }
  redefinirBusca(){
    this.SetCategoria(new Categoria(this.defaultCategory,this.defaultCategory));
    this.activeSearchFilter= '',
    this.activeOrderFilter=0;
  }
  translate(orderId:number){
    return this.ordertypes.filter(x=>x.id == orderId)[0].name;
  }
}
export enum TiposOrdenacao {
  nome,
  nomeDesc,
  preco,
  precoDesc
}
