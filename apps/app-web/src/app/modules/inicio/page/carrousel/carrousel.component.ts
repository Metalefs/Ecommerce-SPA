import { Component, OnInit } from '@angular/core';
import { ObterImagensCarousel } from '../../../../helper/FileHelper';
@Component({
  selector: 'personalizados-lopes-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {

  imageUrls: (string | IImage)[] = [
    { url: ObterImagensCarousel()[0], href: '#headerGfooter', backgroundSize: 'cover', backgroundPosition: 'top' },
    { url: 'assets/images/inicio/carousel/equipamentos-necessarios-empresa-serigrafia.jpg', caption: '', backgroundSize: 'cover', backgroundPosition: 'center' },
    { url: 'assets/images/inicio/carousel/serigrafia.jpeg', caption: 'Serigrafia', backgroundSize: 'cover', backgroundPosition: 'center' },
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
