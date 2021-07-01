import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { CategoriaService } from '../../service';

import { LerCategoria, EditarCategoria, AdicionarCategoria, RemoverCategoria } from '../actions/categoria.actions'
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { order } from '../../../helper/ObjHelper';

export class CategoriaStateModel{
  Categorias: entities.Categoria[];
  areCategoriasLoaded: boolean;

}

@State<CategoriaStateModel>({
  name:"Categorias",
  defaults: {
    Categorias:[],
    areCategoriasLoaded: false
  }
})
@Injectable()
export class CategoriaState {

  constructor(private CategoriaService:CategoriaService){

  }

  @Selector()
  static ObterListaCategorias(state: CategoriaStateModel) {
    return state.Categorias;
  }

  @Selector()
  static areCategoriasLoaded(state: CategoriaStateModel) {
      return state.areCategoriasLoaded;
  }

  @Action(LerCategoria)
  LerCategoria({getState, setState}: StateContext<CategoriaStateModel>){
      return this.CategoriaService.Ler().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            Categorias: result.sort((a, b) => order(a,b,true)),
            areCategoriasLoaded: true
          });
        }));
  }

  @Action(AdicionarCategoria)
  Adicionar({getState,patchState}: StateContext<CategoriaStateModel>, {payload} : AdicionarCategoria){
    return this.CategoriaService.Incluir(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
          Categorias: [...state.Categorias, result]
      });
  }));
  }

  @Action(EditarCategoria)
  Editar({getState,setState}: StateContext<CategoriaStateModel>, {payload, id} : EditarCategoria){
    return this.CategoriaService.Editar(payload).pipe(
      tap(result => {
        const state = getState();
        const ListaCategorias = [...state.Categorias];
        const index = ListaCategorias.findIndex(item => item._id === id);
        ListaCategorias[index] = result;
        setState({
          ...state,
          Categorias: ListaCategorias,
        });
      })
    );
  }

  @Action(RemoverCategoria)
  Remover({getState,setState}: StateContext<CategoriaStateModel>, {id} : RemoverCategoria){
    return this.CategoriaService.Remover(id).pipe(
      tap(result => {
        const state = getState();
        const filteredArray = state.Categorias.filter(item => item._id !== id);
        setState({
          ...state,
          Categorias: filteredArray,
        });
      })
    );
  }

}
