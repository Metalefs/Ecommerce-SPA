import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  mobileQuery: MediaQueryList;
  tabletQuery: MediaQueryList;
  deskQuery: MediaQueryList;

  onSwiperHover( hover: boolean ) {
    if ( hover ) {
      this.swiperEl.nativeElement.swiper.autoplay.stop();
    } else {
      this.swiperEl.nativeElement.swiper.autoplay.start();
    }
  }

  swiperConfig$: Observable<SwiperConfigInterface>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store:Store) {

      this.swiperConfig$ = this.breakpointObserver
            .observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).pipe(
              map((state: BreakpointState) => {

                if (state.matches) {
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
                    slidesPerView          : 1,
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    },
                    autoplay: {
                      delay               : 4000,
                      disableOnInteraction: true,
                    }
                  }
                }
            })
            );
      this.swiperConfig$ = this.breakpointObserver
            .observe([Breakpoints.Tablet]).pipe(
              map((state: BreakpointState) => {

                if (state.matches) {
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
                    slidesPerView          : 3,
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    },
                    autoplay: {
                      delay               : 4000,
                      disableOnInteraction: true,
                    }
                  }
                }
            })
            );
      this.swiperConfig$ = this.breakpointObserver
            .observe([Breakpoints.Web]).pipe(
              map((state: BreakpointState) => {

                if (state.matches) {
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
                    slidesPerView          : 5,
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    },
                    autoplay: {
                      delay               : 4000,
                      disableOnInteraction: true,
                    }
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

  ngOnInit(): void {
    this.swiperEl.nativeElement.swiper.autoplay.start();

  }

}
