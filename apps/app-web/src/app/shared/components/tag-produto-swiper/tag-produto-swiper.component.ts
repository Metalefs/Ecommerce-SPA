import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { Produto } from 'libs/data/src/lib/classes';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProdutoState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-tag-produto-swiper',
  templateUrl: './tag-produto-swiper.component.html',
  styleUrls: ['./tag-produto-swiper.component.scss']
})
export class TagProdutoSwiperComponent implements OnInit {
  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<entities.Produto[]>;
  ProdutosTag:Produto[] = [];
  @Input()TAGS:string[];
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
      this.Produtos$.subscribe(x=>{
       this.TAGS.forEach((tag)=>{
          x.filter(prod=>prod.Tags.filter((prodtag) => prodtag==tag)).forEach(match=>{
            this.ProdutosTag.push(match);
          })
        });
      })
    }
}
