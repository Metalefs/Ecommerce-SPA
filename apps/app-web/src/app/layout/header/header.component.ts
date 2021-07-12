import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { Router } from '@angular/router';
import { entities } from '@personalizados-lopes/data';
import { Select, Store } from '@ngxs/store';

import { Categoria, InformacoesContato, Orcamento, Produto, Sobre } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LerSobre } from '../../data/store/actions/sobre.actions';
import { CategoriaState, InformacoesContatoState, NavStateState, OrcamentoState, ProdutoState, SobreState } from '../../data/store/state';

import { EditarNavState } from '../../data/store/actions/navstate.actions';
import { CheckoutDisplayComponent } from '../../shared/components/dialogs/checkout-display/checkout-display.component';
import { LoginComponent } from '../../modules/login/page/login.component';
import { fade, slideInOut } from '../../animations';
import { EditarCategoriaFiltroProduto } from '../../data/store/actions/filtroproduto.actions';
import { TipoUsuario } from 'libs/data/src/lib/enums';
import { NgDialogAnimationService } from 'ng-dialog-animation';

import { isPlatformBrowser } from '@angular/common';
import { NavState, Link, NavLinksRes } from '../../shared/models/interfaces';
import { CategoriaService } from '../../data/service';

@Component({
  selector: 'personalizados-lopes-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fade,slideInOut]
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: entities.Usuario;
  @Select(SobreState.ObterSobre) Sobre$: Observable<Sobre>;
  @Select(InformacoesContatoState.ObterInformacoesContato) InfoContato$: Observable<InformacoesContato>;
  @Select(SobreState.IsSobreLoaded) IsSobreLoaded$;
  IsSobreLoadedSub: Subscription;
  links = NavLinksRes;
  @Select(NavStateState.ObterNavState) NavState$: Observable<NavState>;
  @Select(ProdutoState.ObterListaProdutos) Produto$: Observable<Produto[]>;
  @Select(CategoriaState.ObterListaCategorias) Categoria$: Observable<Categoria[]>;
  route: string;
  search:boolean=true;
  search_desk:boolean=true;
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  carrinhoVazio:boolean = true;
  search_filter:string="";
  Categoria: entities.Categoria;
  Categorias: entities.Categoria[];
  defaultCategory = "Todos os produtos";
  TipoUsuario = TipoUsuario;
  galeria = {name:"Galeria",href:`/showcase`,queryParams:{}};
  Alerta:string = "Covid-19: Atendendo normalmente, na Personalizados Lopes você recebe em casa.";

  constructor(
    private AuthenticationService:AuthenticationService,
    private router: Router,
    private store: Store,
    public dialog: NgDialogAnimationService,
    private ServicoCategoria: CategoriaService,
    @Inject(PLATFORM_ID) private platform: Object,
    ) {

  }
  // async getAutoComplete() {
  //   this.viewContainerRef.clear();
  //   const { AutocompleteDropdownComponent } = await import('../../shared/components/autocomplete-dropdown/autocomplete-dropdown.component');
  //   this.viewContainerRef.createComponent(
  //     this.cfr.resolveComponentFactory(AutocompleteDropdownComponent)
  //   );
  // }

  ngOnInit(): void {
    this.Carregar();
    if(isPlatformBrowser(this.platform)){

      this.router.events.subscribe(val => {
        this.links.forEach(x=>{
          if(x.href == this.router.url.replace("/",''))
            this.SetActiveNav(x);
        })
      });
    }
    this.Orcamento$.subscribe(x=>{
      if(x.Produto.length > 1)
        this.carrinhoVazio = false;
    });
    this.AuthenticationService.currentUser.subscribe(x=>this.user=x);
    this.CarregarCategorias();
  }

  ngOnDestroy(){
    this.IsSobreLoadedSub.unsubscribe();
  }

  CarregarCategorias(){
    this.ServicoCategoria.Ler().subscribe(x=>{this.Categorias = x as any;});
  }

  SelecionarCategoria($event){
    this.Categoria = this.Categorias.filter(cat => cat.Nome == $event.value)[0];
    this.store.dispatch(new EditarCategoriaFiltroProduto(this.Categoria)).subscribe();
  }

  abrir_procurar(){
    this.search = !this.search;
  }
  executar_pesquisa(){
    this.router.navigate(['/produtos'],{queryParams:{nome:this.search_filter,categoria:'Todos os produtos'}})
  }
  handleSearchValue($event){
    this.search_filter = $event;
  }

  openCheckout(){
    this.dialog.open(CheckoutDisplayComponent, {
      restoreFocus: false,
      width:'512px',
      animation: {
        to: "left",
        incomingOptions: {
          keyframeAnimationOptions: { easing: "ease", duration: 300 }
        },
        outgoingOptions: {
          keyframeAnimationOptions: { easing: "ease", duration: 300 }
        }
      },
      position: { rowStart: "0" },
      height:'100vh',

      panelClass:['no-padding','cart_slide','animate__animated','animate__slideInRight'],
    });
  }

  openLogin(){
    this.dialog.open(LoginComponent, {
      restoreFocus: false,
      width:'512px',
      panelClass:['no-padding','animate__animated','animate__bounceIn']

    });
  }

  Carregar(){
    this.Categoria$.subscribe(cats=>{
      this.links[1].options = [];
      cats.forEach(cat=>{
        this.links[1].options.push({nome:cat.Nome,link:`/produtos`,queryParams:{categoria:cat.Nome}})
      })
    })

    this.IsSobreLoadedSub = this.IsSobreLoaded$.pipe(
      tap((IsSobreLoaded) => {
        if (!IsSobreLoaded) {
          this.store.dispatch(new LerSobre());
        }
      })
    ).subscribe(value => {

    });
  }

  SetActiveNav(link:Link){
    this.store.dispatch(new EditarNavState({activeNav:link.name}));
    this.NavState$.subscribe()
  }

  Logout(){
    this.AuthenticationService.logout();
    this.router.navigateByUrl("/")
  }

}
