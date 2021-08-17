import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { entities } from '@personalizados-lopes/data';
import { ClienteState, OrcamentoState } from 'apps/app-web/src/app/data/store/state';
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
import { MatDialog } from '@angular/material/dialog';
import { ExibicaoPrecoPrazoCepComponent } from '../../../shared/components/dialogs/exibicao-preco-prazo-cep/exibicao-preco-prazo-cep.component';

@Component({
  selector: 'personalizados-lopes-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  animations: [slideInOut,fade]
})
export class InicioComponent implements OnInit {
  @Select(ClienteState.ObterListaClientes) Clientes$: Observable<entities.Cliente[]>;
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<entities.Orcamento>;
  Produtos:Array<Produto>;
  user:Usuario;
  slidesPerView:number=5;
  tipoOrdenacaoSliderProduto=TipoOrdenacaoSwiperProduto;
  mobile:boolean;
  swiperConfig$: Observable<SwiperConfigInterface>;
  constructor(
    private authService: AuthenticationService,
    private produtoService: ProdutoService,
    private breakpointObserver: BreakpointObserver,
    private dialog:MatDialog) {
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
              loop                   : true,
              loopFillGroupWithBlank : false,
              preloadImages          : true,
              height:400,
              lazy                   : false,
              observer               : true,
              navigation             : true,
              slidesPerView:2,
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

  AbrirEstimativaPrecoFrete(){
    this.Orcamento$.subscribe(orc=>{
      this.dialog.open(ExibicaoPrecoPrazoCepComponent, {
        restoreFocus: false,
        width:'512px',
        height:'100vh',
        position:{
          left:'0'
        },
        panelClass:['no-padding'],
        data:{
          cep:orc.Usuario?.EnderecoEntrega.CEP ?? null
        }
      });
    })
  }
}
