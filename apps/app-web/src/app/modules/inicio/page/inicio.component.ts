import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { entities } from '@personalizados-lopes/data';
import { ClienteState } from 'apps/app-web/src/app/data/store/state';
import { BlogPost, Produto, Usuario } from 'libs/data/src/lib/classes';
import { map } from 'rxjs/operators';
import { ProdutoService } from '../../../data/service';
import { CanViewPost } from '../../../helper/ObjHelper';
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TipoOrdenacaoSwiperProduto } from '../../../shared/components/produto-swiper/produto-swiper.component';
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces/filtrarProdutoQuery';
import { fade, slideInOut } from '../../../animations';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'personalizados-lopes-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  animations: [slideInOut,fade]
})
export class InicioComponent implements OnInit {
  @Select(ClienteState.ObterListaClientes) Clientes$: Observable<entities.Cliente[]>;
  Produtos:Array<Produto>;
  user:Usuario;
  slidesPerView:number=5;
  tipoOrdenacaoSliderProduto=TipoOrdenacaoSwiperProduto;
  mobile:boolean;
  swiperConfig$: Observable<SwiperConfigInterface>;
  constructor(
    private authService: AuthenticationService,
    private produtoService: ProdutoService,
    breakpointObserver: BreakpointObserver) {
      breakpointObserver.observe([
        Breakpoints.Handset
      ]).pipe(
        map(res => {
            this.mobile=res.matches;
          }
      )
      )
      this.swiperConfig$ = breakpointObserver.observe([
        Breakpoints.HandsetPortrait
      ]).pipe(
        map(res => {
          this.mobile=res.matches;
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
              loop                   : true,
              loopFillGroupWithBlank : false,
              preloadImages          : true,
              height:400,
              width:750,
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
        })
      );
    }
  fQuery:FiltrarProdutoSearchQuery={
    Nome:"",
    NomeCategoria:"",
    Preco:"",
    Status:"",
    Marca:"",
    Modelo:"",
    Tags:"",
  }
  ngOnInit(): void {

    this.authService.currentUser.subscribe(x=>{
      this.user = x;
    })
    this.produtoService.FiltrarProdutos(this.fQuery,1,6).subscribe(x=>{
      this.Produtos = x.items;
    })
  }

  CanView(post:BlogPost){
    return CanViewPost(post,this.user);
  }
}
