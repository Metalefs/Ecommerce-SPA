import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { Produto } from 'libs/data/src/lib/classes';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProdutoService } from '../../../data/service';
import { LerProduto } from '../../../data/store/actions/produto.actions';
import { ProdutoState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-produto-swiper',
  templateUrl: './produto-swiper.component.html',
  styleUrls: ['./produto-swiper.component.scss']
})
export class ProdutoSwiperComponent implements OnInit {
  Produtos:Produto[];
  slidesPerView:number=5;
  @ViewChild('swiperEl') swiperEl: ElementRef;
  @Input() TipoOrdenacao:TipoOrdenacaoSwiperProduto = TipoOrdenacaoSwiperProduto.Inclusao;
  tipoOrdenacaoSwiperProduto = TipoOrdenacaoSwiperProduto;
  mobileQuery: MediaQueryList;
  tabletQuery: MediaQueryList;
  deskQuery: MediaQueryList;

  onSwiperHover( hover: boolean ) {
    if ( hover ) {
      this.swiperEl?.nativeElement.swiper.autoplay.stop();
    } else {
      this.swiperEl?.nativeElement.swiper.autoplay.start();
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
                    loop                   : true,
                    loopFillGroupWithBlank : false,
                    preloadImages          : true,
                    lazy                   : true,
                    observer               : true,
                    spaceBetween           : 2,
                    slidesPerView          : 3,
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
                    loop                   : true,
                    loopFillGroupWithBlank : true,
                    spaceBetween           : 22,
                    preloadImages          : true,
                    lazy                   : true,
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



      this.pService.Ler().subscribe(x=>{
        this.Produtos=x.items.sort();
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
    setTimeout(()=>{this.swiperEl?.nativeElement.swiper.autoplay.start();},2000)


  }

}
export enum TipoOrdenacaoSwiperProduto{
  Inclusao,
  Visualizacoes,
  Vendas
}
