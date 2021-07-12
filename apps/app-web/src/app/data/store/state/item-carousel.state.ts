import { State, Action, StateContext, Selector } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { ItemCarouselService } from '../../service';

import { LerItemCarousel, EditarItemCarousel, AdicionarItemCarousel, RemoverItemCarousel } from '../actions/item-carousel.actions'
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ItemCarousel } from 'libs/data/src/lib/classes';

export class ItemCarouselStateModel{
  ItemsCarousel: entities.ItemCarousel[];
  areItemsCarouselLoaded: boolean;

}

@State<ItemCarouselStateModel>({
  name:"ItemsCarousel",
  defaults: {
    ItemsCarousel:[],
    areItemsCarouselLoaded: false
  }
})
@Injectable()
export class ItemCarouselState {

  constructor(private ItemCarouselService:ItemCarouselService){

  }

  @Selector()
  static ObterListaItemsCarousel(state: ItemCarouselStateModel) {
      return state.ItemsCarousel;
  }

  @Selector()
  static areItemsCarouselLoaded(state: ItemCarouselStateModel) {
      return state.areItemsCarouselLoaded;
  }

  @Action(LerItemCarousel)
  LerItemCarousel({getState, setState}: StateContext<ItemCarouselStateModel>){
      return this.ItemCarouselService.Ler().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            ItemsCarousel: result as any,
            areItemsCarouselLoaded: true
          });
        }));
  }

  @Action(AdicionarItemCarousel)
  async Adicionar({getState,patchState}: StateContext<ItemCarouselStateModel>, {payload} : AdicionarItemCarousel){
    payload = await this.ItemCarouselService.UploadItemImages(payload);

    return (await this.ItemCarouselService.Incluir(payload).subscribe((x : ItemCarousel)=>{

        const state = getState();
        patchState({
            ItemsCarousel: [...state.ItemsCarousel, x]
        });

    }))
  }

  @Action(EditarItemCarousel)
  async Editar({getState,setState}: StateContext<ItemCarouselStateModel>, {payload, id} : EditarItemCarousel){
    return (await (await this.ItemCarouselService.Editar(payload)).subscribe(result => {
        const state = getState();
        const ListaItemsCarousel = [...state.ItemsCarousel];
        const index = ListaItemsCarousel.findIndex(item => item._id === id);
        ListaItemsCarousel[index] = result;

        setState({
          ...state,
          ItemsCarousel: ListaItemsCarousel,
        });
      })
    );
  }

  @Action(RemoverItemCarousel)
  Remover({getState,setState}: StateContext<ItemCarouselStateModel>, {id} : RemoverItemCarousel){
    return this.ItemCarouselService.Remover(id).pipe(
      tap(result => {
        const state = getState();
        const filteredArray = state.ItemsCarousel.filter(item => item._id !== id);
        setState({
          ...state,
          ItemsCarousel: filteredArray,
        });
      })
    );
  }

}
