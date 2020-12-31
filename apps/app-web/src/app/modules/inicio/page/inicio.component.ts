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

@Component({
  selector: 'personalizados-lopes-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  @Select(ClienteState.ObterListaClientes) Clientes$: Observable<entities.Cliente[]>;
  @Select(ProdutoState.ObterListaProdutos) Produtos$: Observable<entities.Produto[]>;
  Blog:BlogPost[];
  user:Usuario;
  @Select(ClienteState.areClientesLoaded) areClientesLoaded$;
  areClientesLoadedSub: Subscription;
  slidesPerView:number=5;
  constructor(
    breakpointObserver: BreakpointObserver,
    private BlogService:BlogPostService,
    private authService: AuthenticationService ) {
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
    this.BlogService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Blog = data;
    });
    this.authService.currentUser.subscribe(x=>{
      this.user = x;
    })
  }

  CanView(post:BlogPost){
    return CanViewPost(post,this.user);
  }
}
