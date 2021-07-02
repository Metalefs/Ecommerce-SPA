import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { CarouselState, ItemCarouselState } from 'apps/app-web/src/app/data/store/state';
import { removeDuplicates } from 'apps/app-web/src/app/helper/ObjHelper';
import { Carousel, ItemCarousel } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';

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
      console.log(x)
      if(x)
      x.forEach(img=>{
        this.imageUrls.push(img);
        this.imageUrls = removeDuplicates(this.imageUrls,'url')
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
