import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { ClienteService } from '../../service';

import { LerCliente, EditarCliente, AdicionarCliente, RemoverCliente } from '../actions/cliente.actions'
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export class ClienteStateModel{
  Clientes: entities.Cliente[];
  areClientesLoaded: boolean;

}

@State<ClienteStateModel>({
  name:"Clientes",
  defaults: {
    Clientes:[],
    areClientesLoaded: false
  }
})
@Injectable()
export class ClienteState {

  constructor(private ClienteService:ClienteService){

  }

  @Selector()
  static ObterListaClientes(state: ClienteStateModel) {
      return state.Clientes;
  }

  @Selector()
  static areClientesLoaded(state: ClienteStateModel) {
      return state.areClientesLoaded;
  }

  @Action(LerCliente)
  LerCliente({getState, setState}: StateContext<ClienteStateModel>){
      return this.ClienteService.Ler().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            Clientes: result,
            areClientesLoaded: true
          });
        }));
  }

  @Action(AdicionarCliente)
  Adicionar({getState,patchState}: StateContext<ClienteStateModel>, {payload} : AdicionarCliente){
    return this.ClienteService.Incluir(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
          Clientes: [...state.Clientes, result]
      });
  }));
  }

  @Action(EditarCliente)
  async Editar({getState,setState}: StateContext<ClienteStateModel>, {payload, id} : EditarCliente){
    return (await this.ClienteService.Editar(payload)).pipe(
      tap(result => {
        const state = getState();
        const ListaClientes = [...state.Clientes];
        const index = ListaClientes.findIndex(item => item._id === id);
        ListaClientes[index] = result;

        setState({
          ...state,
          Clientes: ListaClientes,
        });
      })
    );
  }

  @Action(RemoverCliente)
  Remover({getState,setState}: StateContext<ClienteStateModel>, {id} : RemoverCliente){
    return this.ClienteService.Remover(id).pipe(
      tap(result => {
        const state = getState();
        const filteredArray = state.Clientes.filter(item => item._id !== id);
        setState({
          ...state,
          Clientes: filteredArray,
        });
      })
    );
  }

}
