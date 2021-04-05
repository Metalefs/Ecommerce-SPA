import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { entities } from '@personalizados-lopes/data';
import { ClienteState, ProdutoState } from 'apps/app-web/src/app/data/store/state';
import { BlogPost, Produto, Usuario } from 'libs/data/src/lib/classes';
import { map } from 'rxjs/operators';
import { BlogPostService, ProdutoService } from '../../../data/service';
import { CanViewPost } from '../../../helper/ObjHelper';
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TipoOrdenacaoSwiperProduto } from '../../../shared/components/produto-swiper/produto-swiper.component';
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces/filtrarProdutoQuery';
import { fade, slideInOut } from '../../../animations';

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
  constructor(
    private authService: AuthenticationService,
    private produtoService: ProdutoService,
    breakpointObserver: BreakpointObserver) {
      breakpointObserver.observe([
        Breakpoints.HandsetPortrait
      ]).pipe(
        map(res => {
            this.mobile=res.matches;
          }
      )
      )
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
