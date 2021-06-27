import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';

import { EditarFiltroProduto, AdicionarFiltroProduto, RemoverFiltroProduto, AdicionarListaProdutosFiltroProduto, EditarCategoriaFiltroProduto, EditarSearchFiltroProduto } from '../actions/filtroproduto.actions';

import { Injectable } from '@angular/core';
import { Categoria } from 'libs/data/src/lib/classes';
let defaultCategory = "Todos os produtos";
export class FiltroProdutoStateModel{
  FiltroProdutos: entities.Produto[];
  Categoria: entities.Categoria;
  CategoriasAtivas: entities.Categoria[];
  SearchFilter: string;
  OrderFilter: number;
  areFiltroProdutosLoaded: boolean;
}

@State<FiltroProdutoStateModel>({
  name:"FiltroProdutos",
  defaults: {
    FiltroProdutos:[],
    Categoria: new Categoria(defaultCategory,defaultCategory),
    CategoriasAtivas: [new Categoria(defaultCategory,defaultCategory)],
    SearchFilter: "",
    OrderFilter: 0,
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
        CategoriasAtivas : action.payload.CategoriasAtivas,
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
      CategoriasAtivas : action.payload.CategoriasAtivas,
      SearchFilter : action.payload.SearchFilter,
      OrderFilter : action.payload.OrderFilter,
      FiltroProdutos : action.payload.Produtos
    });
  }

  @Action(EditarCategoriaFiltroProduto)
  EditarCategoriaFiltroProduto(context: StateContext<FiltroProdutoStateModel>, action: EditarCategoriaFiltroProduto) {
    const current = context.getState();
    if(action.payload == null){
      action.payload = new Categoria(defaultCategory,defaultCategory);
    }
    context.patchState({
        Categoria : action.payload,
        CategoriasAtivas :current.CategoriasAtivas,
        SearchFilter : current.SearchFilter,
        OrderFilter : current.OrderFilter,
        FiltroProdutos : current.FiltroProdutos
    });
  }

  @Action(EditarSearchFiltroProduto)
  EditarSearchFiltroProduto(context: StateContext<FiltroProdutoStateModel>, action: EditarSearchFiltroProduto) {
    const current = context.getState();

    context.patchState({
        Categoria : current.Categoria,
        CategoriasAtivas :current.CategoriasAtivas,
        SearchFilter : action.payload,
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
