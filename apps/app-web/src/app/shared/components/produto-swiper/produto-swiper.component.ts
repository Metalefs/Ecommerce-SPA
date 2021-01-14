import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { Produto } from 'libs/data/src/lib/classes';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LerProduto } from '../../../data/store/actions/produto.actions';
import { ProdutoState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-produto-swiper',
  templateUrl: './produto-swiper.component.html',
  styleUrls: ['./produto-swiper.component.scss']
})
export class ProdutoSwiperComponent implements OnInit {
  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<Produto[]>;

  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;

  areProdutosLoadedSub: Subscription;

  slidesPerView:number=5;
  @ViewChild('swiperEl') swiperEl: ElementRef;


  onSwiperHover( hover: boolean ) {
    if ( hover ) {
      this.swiperEl.nativeElement.swiper.autoplay.stop();
    } else {
      this.swiperEl.nativeElement.swiper.autoplay.start();
    }
  }
  constructor(
    breakpointObserver: BreakpointObserver,private store:Store) {
      this.swiperConfig$ = breakpointObserver.observe([
        Breakpoints.HandsetPortrait
      ]).pipe(
        map(res => {
          if (res.matches) {
              return {
                direction              : 'horizontal',
                updateOnWindowResize   : true,
                autoHeight             : true,
                height                 : 400,
                keyboard               : true,
                loop                   : true,
                loopFillGroupWithBlank : false,
                preloadImages          : true,
                lazy                   : false,
                observer               : true,
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
                slidesPerView:1,
                autoplay: {
                  delay               : 4000,
                  disableOnInteraction: true,

                },
              }
          }
          else{
            return {
              direction              : 'horizontal',
              updateOnWindowResize   : true,
              autoHeight             : true,
              height                 : 400,
              keyboard               : true,
              loop                   : true,
              loopFillGroupWithBlank : false,
              preloadImages          : true,
              lazy                   : false,
              observer               : true,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              centerInsufficientSlides   : false,
              slidesPerView:5,
              autoplay: {
                delay               : 4000,
                disableOnInteraction: false,
              },
            }
          }
        })
      );
      this.areProdutosLoadedSub = this.areProdutosLoaded$.pipe(
        tap((areProdutosLoaded) => {
          if(!areProdutosLoaded)
            this.store.dispatch(new LerProduto());
        })
      ).subscribe(value => {
        console.log(value);
      });
    }

    swiperConfig$: Observable<SwiperConfigInterface>;
  ngOnInit(): void {
    this.swiperEl.nativeElement.swiper.autoplay.start();
  }

}
