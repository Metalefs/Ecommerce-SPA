import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { tap } from 'rxjs/operators';
import { SobreService } from '../../service';
import { LerSobre, EditarSobre } from '../actions/sobre.actions'

export class SobreStateModel{
  Sobre: entities.Sobre;
  sobreLoaded: boolean;
}

@State<SobreStateModel>({
  name:"Sobre",
  defaults:{
    Sobre: null,
    sobreLoaded: false
  }
})
@Injectable()
export class SobreState {

  constructor(private SobreService:SobreService){

  }

  @Selector()
  static ObterSobre(state: SobreStateModel) {
    return state.Sobre;
  }

  @Selector()
  static IsSobreLoaded(state: SobreStateModel) {
    return state.sobreLoaded;
  }

  @Action(LerSobre)
  LerSobre({getState, setState}: StateContext<SobreStateModel>){
      return this.SobreService.Ler().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            Sobre: result,
            sobreLoaded: true
          });
        }));
  }

  @Action(EditarSobre)
  Editar({getState,setState}: StateContext<SobreStateModel>, {payload, id} : EditarSobre){
    return this.SobreService.Editar(payload).pipe(
      tap(result => {
        const state = getState();
        const Sobre = result;
        localStorage.setItem("cacheSobreState",JSON.stringify(Sobre));
        setState({
          ...state,
          Sobre: Sobre,
        });
      })
    );
  }

}
