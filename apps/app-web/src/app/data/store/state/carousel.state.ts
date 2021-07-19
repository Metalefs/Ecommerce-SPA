import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { tap } from 'rxjs/operators';
import { CarouselService } from '../../service';
import { LerCarousel, EditarCarousel } from '../actions/carousel.actions'

export class CarouselStateModel{
  Carousel: entities.Carousel;
  sobreLoaded: boolean;
}

@State<CarouselStateModel>({
  name:"Carousel",
  defaults:{
    Carousel: null,
    sobreLoaded: false
  }
})
@Injectable()
export class CarouselState {

  constructor(private CarouselService:CarouselService){

  }

  @Selector()
  static ObterCarousel(state: CarouselStateModel) {
    return state.Carousel;
  }

  @Selector()
  static IsCarouselLoaded(state: CarouselStateModel) {
    return state.sobreLoaded;
  }

  @Action(LerCarousel)
  LerCarousel({getState, setState}: StateContext<CarouselStateModel>){
      return this.CarouselService.Ler().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            Carousel: result as any,
            sobreLoaded: true
          });
        }));
  }

  @Action(EditarCarousel)
  Editar({getState,setState}: StateContext<CarouselStateModel>, {payload, id} : EditarCarousel){
    return this.CarouselService.Editar(payload).pipe(
      tap(result => {
        const state = getState();
        const Carousel = result;
        setState({
          ...state,
          Carousel: Carousel,
        });
      })
    );
  }

}
