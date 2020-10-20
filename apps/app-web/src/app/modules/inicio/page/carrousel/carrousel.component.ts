import { Component, OnInit } from '@angular/core';
import { ObterImagensCarousel } from '../../../../helper/FileHelper';
@Component({
  selector: 'personalizados-lopes-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {

  // imageSources:string[] = ObterImagensCarousel();
  imageUrls: (string | IImage)[] = [
    { url: ObterImagensCarousel()[0], href: '#headerGfooter', backgroundSize: 'cover', backgroundPosition: 'top' },
    // { url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg', clickAction: () => alert('custom click function') },
    // { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg', caption: '', href: 'https://www.apple.com/' },
    // 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56674755/mr_pb_is_the_best.0.jpg',
    { url: 'assets/images/inicio/carousel/equipamentos-necessarios-empresa-serigrafia.jpg', caption: '', backgroundSize: 'cover', backgroundPosition: 'center' },
    { url: 'assets/images/inicio/carousel/serigrafia.jpeg', caption: 'Serigrafia', backgroundSize: 'cover', backgroundPosition: 'center' },
    //{ url: '', caption: 'Serigrafia', backgroundSize: 'cover', backgroundPosition: 'center' }
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
