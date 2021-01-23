import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { entities } from '@personalizados-lopes/data';
import { ClienteState, ProdutoState } from 'apps/app-web/src/app/data/store/state';
import { BlogPost, Usuario } from 'libs/data/src/lib/classes';
import { map } from 'rxjs/operators';
import { BlogPostService } from '../../../data/service';
import { CanViewPost } from '../../../helper/ObjHelper';
import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TipoOrdenacaoSwiperProduto } from '../../../shared/components/produto-swiper/produto-swiper.component';

@Component({
  selector: 'personalizados-lopes-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  @Select(ClienteState.ObterListaClientes) Clientes$: Observable<entities.Cliente[]>;
  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<entities.Produto[]>;

  user:Usuario;
  @Select(ClienteState.areClientesLoaded) areClientesLoaded$;
  areClientesLoadedSub: Subscription;
  slidesPerView:number=5;
  tipoOrdenacaoSliderProduto=TipoOrdenacaoSwiperProduto;
  constructor(
    private authService: AuthenticationService ) {
    }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x=>{
      this.user = x;
    })
  }

  CanView(post:BlogPost){
    return CanViewPost(post,this.user);
  }
}
