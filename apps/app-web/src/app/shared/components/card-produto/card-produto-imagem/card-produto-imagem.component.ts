import { Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Carousel } from 'libs/data/src/lib/classes';
import { IImage } from 'ng-simple-slideshow';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { CarouselState } from '../../../../data/store/state';
import { Produto } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-card-produto-imagem',
  templateUrl: './card-produto-imagem.component.html',
  styleUrls: ['./card-produto-imagem.component.scss']
})
export class CardProdutoImagemComponent implements OnInit {
  @Input() Produto: Produto;

  @Select(CarouselState.ObterCarousel) Carrosel$: Observable<Carousel>;
  imageUrls: (string | IImage)[] = [

  ];
  swiperConfig: SwiperConfigInterface = {
    direction              : 'horizontal',
    keyboard               : true,
    loop                   : true,
    loopFillGroupWithBlank : false,
    preloadImages          : true,
    lazy                   : true,
    observer               : true,
    navigation             : true,
    allowSlidePrev:true,
    allowSlideNext:true,
    centeredSlides:true,
    updateOnImagesReady: true,
    slidesPerView          : 1,
    autoplay: {
      delay                : 4000,
      disableOnInteraction : false,
    },
  };
  constructor() { }

  ngOnInit(): void {
    if(this.Produto.Imagem)
    this.Produto.Imagem.forEach(img=>{
      this.imageUrls.push({
        url:img,
        href:"",
        backgroundSize:"cover",
        backgroundPosition:"center",
        // caption:this.Produto?.DescricaoRapida
        // ? this.Produto?.DescricaoRapida
        // : this.Produto?.Nome,
      });
    })
  }

}
