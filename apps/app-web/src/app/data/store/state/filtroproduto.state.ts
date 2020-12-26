import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { ProdutoService } from '../../service';

import { LerFiltroProduto, EditarFiltroProduto, AdicionarFiltroProduto, RemoverFiltroProduto, AdicionarListaProdutosFiltroProduto, EditarCategoriaFiltroProduto } from '../actions/filtroproduto.actions';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Categoria } from 'libs/data/src/lib/classes';
import { OrderType } from '../../models/order-type';
let defaultCategory = "Todos os produtos";
export class FiltroProdutoStateModel{
  FiltroProdutos: entities.Produto[];
  Categoria: entities.Categoria;
  SearchFilter: string;
  OrderFilter: number;
  areFiltroProdutosLoaded: boolean;

}

@State<FiltroProdutoStateModel>({
  name:"FiltroProdutos",
  defaults: {
    FiltroProdutos:[],
    Categoria: new Categoria(defaultCategory,defaultCategory),
    SearchFilter: "",
    OrderFilter: 1,
    areFiltroProdutosLoaded: false
  }
})
@Injectable()
export class FiltroProdutoState {

  constructor(){

  }

  @Selector()
  static ObterListaFiltroProdutos(state: FiltroProdutoStateModel) {
      return state;
  }

  @Selector()
  static areFiltroProdutosLoaded(state: FiltroProdutoStateModel) {
      return state.areFiltroProdutosLoaded;
  }

  @Action(AdicionarFiltroProduto)
  AdicionarFiltroProduto(context: StateContext<FiltroProdutoStateModel>, action: AdicionarFiltroProduto) {
    const current = context.getState();

    context.patchState({
        Categoria : action.payload.Categoria,
        SearchFilter : action.payload.SearchFilter,
        OrderFilter : action.payload.OrderFilter,
        FiltroProdutos : action.payload.Produtos
    });
  }

  @Action(EditarFiltroProduto)
  EditarFiltroProduto(context: StateContext<FiltroProdutoStateModel>, action: EditarFiltroProduto) {
    const current = context.getState();

    context.patchState({
        Categoria : action.payload.Categoria,
        SearchFilter : action.payload.SearchFilter,
        OrderFilter : action.payload.OrderFilter,
        FiltroProdutos : action.payload.Produtos
    });
  }

  @Action(EditarCategoriaFiltroProduto)
  EditarCategoriaFiltroProduto(context: StateContext<FiltroProdutoStateModel>, action: EditarCategoriaFiltroProduto) {
    const current = context.getState();

    context.patchState({
        Categoria : action.payload,
        SearchFilter : current.SearchFilter,
        OrderFilter : current.OrderFilter,
        FiltroProdutos : current.FiltroProdutos
    });
  }

  @Action(AdicionarListaProdutosFiltroProduto)
  AdicionarListaProdutosFiltroProduto(context: StateContext<FiltroProdutoStateModel>, action: AdicionarListaProdutosFiltroProduto) {
    const current = context.getState();

    context.patchState({
      FiltroProdutos : action.payload
    });
  }


}
