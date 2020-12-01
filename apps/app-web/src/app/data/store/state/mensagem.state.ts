import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { MensagemService } from '../../service';

import { LerMensagem, EditarMensagem, AdicionarMensagem, RemoverMensagem } from '../actions/mensagem.actions'
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export class MensagemStateModel{
  Mensagens: entities.Mensagem[];
  areMensagemsLoaded: boolean;

}

@State<MensagemStateModel>({
  name:"Mensagens",
  defaults: {
    Mensagens:[],
    areMensagemsLoaded: false
  }
})
@Injectable()
export class MensagemState {

  constructor(private MensagemService:MensagemService){

  }

  @Selector()
  static ObterListaMensagems(state: MensagemStateModel) {
      return state.Mensagens;
  }

  @Selector()
  static areMensagemsLoaded(state: MensagemStateModel) {
      return state.areMensagemsLoaded;
  }

  @Action(LerMensagem)
  LerMensagem({getState, setState}: StateContext<MensagemStateModel>){
      return this.MensagemService.Ler().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            Mensagens: result,
            areMensagemsLoaded: true
          });
        }));
  }

  @Action(AdicionarMensagem)
  Adicionar({getState,patchState}: StateContext<MensagemStateModel>, {payload} : AdicionarMensagem){
    return this.MensagemService.Incluir(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
          Mensagens: [...state.Mensagens, result]
      });
  }));
  }

  @Action(EditarMensagem)
  Editar({getState,setState}: StateContext<MensagemStateModel>, {payload, id} : EditarMensagem){
    return this.MensagemService.Editar(payload).pipe(
      tap(result => {
        const state = getState();
        const ListaMensagems = [...state.Mensagens];
        const index = ListaMensagems.findIndex(item => item._id === id);
        ListaMensagems[index] = result;

        setState({
          ...state,
          Mensagens: ListaMensagems,
        });
      })
    );
  }

  @Action(RemoverMensagem)
  Remover({getState,setState}: StateContext<MensagemStateModel>, {id} : RemoverMensagem){
    return this.MensagemService.Remover(id).pipe(
      tap(result => {
        const state = getState();
        const filteredArray = state.Mensagens.filter(item => item._id !== id);
        setState({
          ...state,
          Mensagens: filteredArray,
        });
      })
    );
  }

}
