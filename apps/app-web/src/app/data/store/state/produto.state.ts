import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { ProdutoService } from '../../service';

import { LerProduto, EditarProduto, AdicionarProduto, RemoverProduto, GostarProduto, RateProduto } from '../actions/produto.actions'
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';

export class ProdutoStateModel{
  Produtos: entities.Produto[];
  areProdutosLoaded: boolean;

}

@State<ProdutoStateModel>({
  name:"Produtos",
  defaults: {
    Produtos:[],
    areProdutosLoaded: false
  }
})
@Injectable()
export class ProdutoState {

  constructor(private ProdutoService:ProdutoService){

  }

  @Selector()
  static ObterListaProdutos(state: ProdutoStateModel) {
      return state.Produtos;
  }

  @Selector()
  static areProdutosLoaded(state: ProdutoStateModel) {
      return state.areProdutosLoaded;
  }

  @Action(LerProduto)
  LerProduto({getState, setState}: StateContext<ProdutoStateModel>){
      return this.ProdutoService.Ler().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            Produtos: result,
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

}
