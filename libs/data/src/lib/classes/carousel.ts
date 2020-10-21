import { entidadeBase } from '../interfaces/entity';
import { MongoDocument } from './abstract/MongoDocument';

export class Carousel extends MongoDocument implements entidadeBase {
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
  static readonly NomeID:string = "Carousel";
    constructor(
      height: string,
      minHeight: string,
      arrowSize: string,
      showArrows: boolean,
      disableSwiping: boolean,
      autoPlay: boolean,
      autoPlayInterval: number,
      stopAutoPlayOnSlide: boolean,
      debug: boolean,
      backgroundSize: string,
      backgroundPosition: string,
      backgroundRepeat: string,
      showDots: boolean,
      dotColor: string,
      showCaptions: boolean,
      captionColor: string,
      captionBackground: string,
      lazyLoad: boolean,
      hideOnNoSlides: boolean,
      width: string,
      fullscreen: boolean,
      enableZoom: boolean,
      enablePan: boolean,
      noLoop: boolean,
    ){
        super();
        this.height =height;
        this.minHeight =minHeight;
        this.arrowSize =arrowSize;
        this.showArrows =showArrows;
        this.disableSwiping =disableSwiping;
        this.autoPlay =autoPlay;
        this.autoPlayInterval =autoPlayInterval;
        this.stopAutoPlayOnSlide =stopAutoPlayOnSlide;
        this.debug =debug;
        this.backgroundSize =backgroundSize;
        this.backgroundPosition =backgroundPosition;
        this.backgroundRepeat =backgroundRepeat;
        this.showDots =showDots;
        this.dotColor =dotColor;
        this.showCaptions =showCaptions;
        this.captionColor =captionColor;
        this.captionBackground =captionBackground;
        this.lazyLoad =lazyLoad;
        this.hideOnNoSlides =hideOnNoSlides;
        this.width =width;
        this.fullscreen =fullscreen;
        this.enableZoom =enableZoom;
        this.enablePan =enablePan;
        this.noLoop =noLoop;
    }
    DataHoraCriacao: Date;
    DataHoraAlteracao: Date;
    DataHoraExclusao: Date;
}
