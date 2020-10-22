import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ItemCarouselState } from 'apps/app-web/src/app/data/store/state';
import { ItemCarousel } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { ObterImagensCarousel } from '../../../../helper/FileHelper';
@Component({
  selector: 'personalizados-lopes-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {
  @Select(ItemCarouselState.ObterListaItemsCarousel) ItemsCarousel$: Observable<ItemCarousel[]>;
  imageUrls: (string | IImage)[] = [

  ];
  height: string = '52vh';
  minHeight: string;
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 10333;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = true;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = false;
  hideOnNoSlides: boolean = false;
  width: string = '100%';
  fullscreen: boolean = false;
  enableZoom: boolean = false;
  enablePan: boolean = false;
  noLoop: boolean = false;

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
