import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProdutoState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-produto-swiper',
  templateUrl: './produto-swiper.component.html',
  styleUrls: ['./produto-swiper.component.scss']
})
export class ProdutoSwiperComponent implements OnInit {
  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<entities.Produto[]>;
  slidesPerView:number=5;
  constructor(
    breakpointObserver: BreakpointObserver,) {
      this.swiperConfig$ = breakpointObserver.observe([
        Breakpoints.HandsetPortrait
      ]).pipe(
        map(res => {
          if (res.matches) {
              return {
                direction              : 'horizontal',
                keyboard               : true,
                // loop                   : true,
                loopFillGroupWithBlank : false,
                preloadImages          : true,
                lazy                   : false,
                observer               : true,
                navigation             : true,
                slidesPerView:1,
                autoplay: {
                  delay               : 4000,
                  disableOnInteraction: false,
                },
              }
          }
          else{
            return {
              direction              : 'horizontal',
              keyboard               : true,
              // loop                   : true,
              loopFillGroupWithBlank : false,
              preloadImages          : true,
              lazy                   : false,
              observer               : true,
              navigation             : true,
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
    }

    swiperConfig$: Observable<SwiperConfigInterface>;
  ngOnInit(): void {
  }

}
