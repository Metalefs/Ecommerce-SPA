import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { InformacoesContato } from 'libs/data/src/lib/classes';
import { tap } from 'rxjs/operators';
import { InformacoesContatoService } from '../../service';
import { LerInformacoesContato, EditarInformacoesContato } from '../actions/informacoescontato.actions'

export class InformacoesContatoStateModel{
  InformacoesContato: entities.InformacoesContato;
  InformacoesContatoLoaded: boolean;
}

@State<InformacoesContatoStateModel>({
  name:"InformacoesContato",
  defaults:{
    InformacoesContato: null,
    InformacoesContatoLoaded: false
  }
})
@Injectable()
export class InformacoesContatoState {

  constructor(private InformacoesContatoService:InformacoesContatoService){

  }

  @Selector()
  static ObterInformacoesContato(state: InformacoesContatoStateModel) {
    return state.InformacoesContato;
  }

  @Selector()
  static IsInformacoesContatoLoaded(state: InformacoesContatoStateModel) {
      return state.InformacoesContatoLoaded;
  }

  @Action(LerInformacoesContato)
  LerInformacoesContato({getState, setState}: StateContext<InformacoesContatoStateModel>){
      return this.InformacoesContatoService.Ler().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            InformacoesContato: result as any as InformacoesContato,
            InformacoesContatoLoaded: true
          });
        }));
  }

  @Action(EditarInformacoesContato)
  Editar({getState,setState}: StateContext<InformacoesContatoStateModel>, {payload, id} : EditarInformacoesContato){
    return this.InformacoesContatoService.Editar(payload).pipe(
      tap(result => {
        const state = getState();
        const InformacoesContato = result;
        setState({
          ...state,
          InformacoesContato: InformacoesContato,
        });
      })
    );
  }

}
