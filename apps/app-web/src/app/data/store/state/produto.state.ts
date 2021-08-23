import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { ProdutoService } from '../../service';

import { LerProduto, EditarProduto, AdicionarProduto, RemoverProduto, GostarProduto, RateProduto, IncrementarVendaProduto, IncrementarVisualizacoesProduto, AdicionarComparacao, AdicionarFavorito, RemoverComparacao, RemoverFavorito, AbrirPreviewProduto } from '../actions/produto.actions'
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';
import { MatDialog } from '@angular/material/dialog';
import { PreviewProdutoComponent } from '../../../shared/components/dialogs/preview-produto/preview-produto.component';

export class ProdutoStateModel{
  Produtos: entities.Produto[];
  areProdutosLoaded: boolean;
  Page:number;
  Limit:number;
  Total:number;
  Favoritos:Produto[];
  Comparacao:Produto[];
}

@State<ProdutoStateModel>({
  name:"Produtos",
  defaults: {
    Produtos:[],
    Page:1,
    Limit:12,
    Total:0,
    areProdutosLoaded: false,
    Favoritos: [],
    Comparacao: [],
  }
})
@Injectable()
export class ProdutoState {

  constructor(private ProdutoService:ProdutoService, private dialog:MatDialog){

  }

  @Selector()
  static ObterListaProdutos(state: ProdutoStateModel) {
      return state.Produtos;
  }

  @Selector()
  static areProdutosLoaded(state: ProdutoStateModel) {
      return state.areProdutosLoaded;
  }

  @Selector()
  static ObterListaFavoritos(state: ProdutoStateModel) {
    return state.Favoritos;
  }

  @Selector()
  static ObterListaComparacao(state: ProdutoStateModel) {
    return state.Comparacao;
  }
  @Action(LerProduto)
  LerProduto({getState, setState}: StateContext<ProdutoStateModel>){
      return this.ProdutoService.Ler().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            Produtos: result.items,
            Total: result.total,
            areProdutosLoaded: true
          });
        }));
  }

  @Action(AdicionarProduto)
  async Adicionar({getState,patchState}: StateContext<ProdutoStateModel>, {payload} : AdicionarProduto){

    payload = await this.ProdutoService.UploadItemImages(payload);

    return (await this.ProdutoService.Incluir(payload).subscribe((x : Produto)=>{

        const state = getState();
        patchState({
            Produtos: [...state.Produtos, x]
        });

    }))
  }

  @Action(AbrirPreviewProduto)
  async AbrirPreviewProduto({getState,patchState}: StateContext<ProdutoStateModel>, {payload} : AbrirPreviewProduto){

    this.dialog.open(PreviewProdutoComponent, {
      width:'80vw',
      height:'80vh',
      restoreFocus: false,
      data:payload,
      panelClass:['']
    });
  }

  @Action(EditarProduto)
  async Editar({getState,setState}: StateContext<ProdutoStateModel>, {payload, id} : EditarProduto){
    return (await (await this.ProdutoService.Editar(payload)).subscribe(result => {
        const state = getState();
        const ListaProdutos = [...state.Produtos];
        const index = ListaProdutos.findIndex(item => item._id === id);
        ListaProdutos[index] = result;

        setState({
          ...state,
          Produtos: ListaProdutos,
        });
      })
    );
  }

  @Action(GostarProduto)
  Gostar({getState,setState}: StateContext<ProdutoStateModel>, {id} : GostarProduto){
    return this.ProdutoService.Gostar(id).pipe(
      tap(result => {
        const state = getState();
        const ListaProdutos = [...state.Produtos];
        const index = ListaProdutos.findIndex(item => item._id === id);
        ListaProdutos[index].Likes = result.Likes;

        setState({
          ...state,
          Produtos: ListaProdutos,
        });
      })
    );
  }

  @Action(IncrementarVendaProduto)
  IncrementarVendaProduto({getState,setState}: StateContext<ProdutoStateModel>, {id} : IncrementarVendaProduto){
    return this.ProdutoService.IncrementarVenda(id).pipe(
      tap(result => {
        const state = getState();
        const ListaProdutos = [...state.Produtos];
        const index = ListaProdutos.findIndex(item => item._id === id);
        ListaProdutos[index].Vendas = result.Vendas;

        setState({
          ...state,
          Produtos: ListaProdutos,
        });
      })
    );
  }

  @Action(IncrementarVisualizacoesProduto)
  IncrementarVisualizacoesProduto({getState,setState}: StateContext<ProdutoStateModel>, {id} : IncrementarVisualizacoesProduto){
    return this.ProdutoService.IncrementarVisualizacoes(id).pipe(
      tap(result => {
        const state = getState();
        const ListaProdutos = state.Produtos;
        const index = ListaProdutos.findIndex(item => item._id === id);
        if(ListaProdutos[index])
        ListaProdutos[index].Visualizacoes = result.Visualizacoes;
        setState({
          ...state,
          Produtos: ListaProdutos,
        });
      })
    );
  }

  @Action(RateProduto)
  Rate({getState,setState}: StateContext<ProdutoStateModel>, {id,rating} : RateProduto){
    return this.ProdutoService.Rate(id,rating).pipe(
      tap(result => {
        const state = getState();
        const ListaProdutos = [...state.Produtos];
        const index = ListaProdutos.findIndex(item => item._id === id);
        ListaProdutos[index].Rating = result.Rating;

        setState({
          ...state,
          Produtos: ListaProdutos,
        });
      })
    );
  }

  @Action(RemoverProduto)
  async Remover({getState,setState}: StateContext<ProdutoStateModel>, {id} : RemoverProduto){
    return (await this.ProdutoService.Remover(id)).pipe(
      tap(result => {
        const state = getState();
        const filteredArray = state.Produtos.filter(item => item._id !== id);
        setState({
          ...state,
          Produtos: filteredArray,
        });
      })
    );
  }


  @Action(AdicionarFavorito)
  AdicionarFavorito({getState,patchState}: StateContext<ProdutoStateModel>, {produto} : AdicionarFavorito){
    let state = getState();
    let favorites = state.Favoritos ?? [];
    if(!favorites?.find(prod=>prod._id == produto._id))
      favorites.push(produto);
    else {
      let idx = favorites?.findIndex(prod=>prod._id == produto._id);
      favorites.splice(idx,1);
    }
    patchState({
      ...state,
      Favoritos: favorites,
    });
  }

  @Action(RemoverFavorito)
  RemoverFavorito({getState,patchState}: StateContext<ProdutoStateModel>, {produto} : RemoverFavorito){
    let state = getState();
    let favorites = state.Favoritos;
    let idx = favorites?.findIndex(prod=>prod._id == produto._id);
    favorites.splice(idx,1);
    patchState({
      ...state,
      Favoritos: favorites,
    });
  }

  @Action(AdicionarComparacao)
  AdicionarComparacao({getState,patchState}: StateContext<ProdutoStateModel>, {produto} : AdicionarComparacao){
    let state = getState();
    let comparison = state.Comparacao ?? [];
    if(!comparison?.find(prod=>prod._id == produto._id))
      comparison.push(produto);
    else {
      let idx = comparison?.findIndex(prod=>prod._id == produto._id);
      comparison.splice(idx,1);
    }
    patchState({
      ...state,
      Comparacao: comparison,
    });
  }

  @Action(RemoverComparacao)
  RemoverComparacao({getState,patchState}: StateContext<ProdutoStateModel>, {produto} : RemoverComparacao){
    let state = getState();
    let comparison = state.Favoritos;
    let idx = comparison?.findIndex(prod=>prod._id == produto._id);
    comparison.splice(idx,1);
    patchState({
      ...state,
      Comparacao: comparison,
    });
  }
}
