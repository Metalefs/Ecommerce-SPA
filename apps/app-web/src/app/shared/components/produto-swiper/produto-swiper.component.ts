import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProdutoService } from '../../../data/service';

@Component({
  selector: 'personalizados-lopes-produto-swiper',
  templateUrl: './produto-swiper.component.html',
  styleUrls: ['./produto-swiper.component.scss']
})
export class ProdutoSwiperComponent implements OnInit {
  Produtos:Produto[];
  @Input()slidesPerView:number=5;
  @Input()display:string ='row';
  @ViewChild('swiperEl') swiperEl: ElementRef;
  @Input() TipoOrdenacao:TipoOrdenacaoSwiperProduto = TipoOrdenacaoSwiperProduto.Inclusao;
  tipoOrdenacaoSwiperProduto = TipoOrdenacaoSwiperProduto;
  mobileQuery: MediaQueryList;
  tabletQuery: MediaQueryList;
  deskQuery: MediaQueryList;

  onSwiperHover( hover: boolean ) {
    if ( hover ) {
      this.swiperEl?.nativeElement?.swiper?.autoplay.stop();
    } else {
      this.swiperEl?.nativeElement?.swiper?.autoplay.start();
    }
  }

  swiperConfig$: Observable<SwiperConfigInterface>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private pService:ProdutoService) {

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
                    spaceBetween           : 2,
                    lazy                   : true,
                    observer               : true,
                    slidesPerView          : 1,
                    roundLengths           : true,
                    parallax:true,
                    flip:true,
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
                    loop                   : false,
                    loopFillGroupWithBlank : false,
                    preloadImages          : false,
                    lazy                   : false,
                    observer               : true,
                    spaceBetween           : 1,
                    slidesPerView          : this.slidesPerView,
                    roundLengths           : true,
                    parallax:true,
                    flip:true,
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
                    loop                   : false,
                    loopFillGroupWithBlank : false,
                    spaceBetween           : 22,
                    preloadImages          : true,
                    lazy                   : true,
                    observer               : true,
                    slidesPerView          : this.Produtos.length > this.slidesPerView ? this.slidesPerView : this.Produtos.length,
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



      this.pService.LerDestaques().subscribe(x=>{
        this.Produtos=x.sort();
        switch(this.TipoOrdenacao){
          case TipoOrdenacaoSwiperProduto.Vendas:{
            this.Produtos.sort((a,b)=>b.Vendas - a.Vendas);
            break;
          }
          case TipoOrdenacaoSwiperProduto.Visualizacoes:{
            this.Produtos.sort((a,b)=>b.Visualizacoes - a.Visualizacoes)
          }
        }
      })
    }

  ngOnInit(): void {
    setTimeout(()=>{this.swiperEl?.nativeElement?.swiper?.autoplay.start();},2000)
  }

}
export enum TipoOrdenacaoSwiperProduto{
  Inclusao,
  Visualizacoes,
  Vendas
}
