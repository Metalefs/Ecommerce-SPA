import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { CarouselState, ItemCarouselState } from 'apps/app-web/src/app/data/store/state';
import { Carousel, ItemCarousel } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { ObterImagensCarousel } from '../../../../helper/FileHelper';
@Component({
  selector: 'personalizados-lopes-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {
  @Select(CarouselState.ObterCarousel) Carrosel$: Observable<Carousel>;
  @Select(ItemCarouselState.ObterListaItemsCarousel) ItemsCarousel$: Observable<ItemCarousel[]>;
  imageUrls: (string | IImage)[] = [

  ];

  constructor() { }


  ngOnInit(): void {
    this.ItemsCarousel$.subscribe(x=>{
      if(x)
      x.forEach(img=>{
        this.imageUrls.push(img);
      })
    })

  }

}
interface IImage {
  url: string | null;
  href?: string;
  clickAction?: Function;
  caption?: string;
  title?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
}
