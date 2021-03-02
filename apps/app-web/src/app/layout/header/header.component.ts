import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { entities } from '@personalizados-lopes/data';
import { Select, Store } from '@ngxs/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CheckoutComponent } from '../../modules/checkout/page/checkout/checkout.component';

import { Categoria, Orcamento, Produto, Sobre } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LerSobre } from '../../data/store/actions/sobre.actions';
import { CategoriaState, NavStateState, OrcamentoState, ProdutoState, SobreState } from '../../data/store/state';
import { NavState } from '../../data/models/navstate';
import { NavLinks, NavLinksRes } from '../../data/models/navlinks';

import { EditarNavState } from '../../data/store/actions/navstate.actions';
import { Link } from '../../data/models';
import { ConfirmacaoComponent } from '../../modules/checkout/page/confirmacao/confirmacao.component';
import { CheckoutDisplayComponent } from '../../shared/components/dialogs/checkout-display/checkout-display.component';
import { LoginComponent } from '../../modules/login/page/login.component';
import { fade } from '../../animations';
import { EditarCategoriaFiltroProduto, EditarSearchFiltroProduto } from '../../data/store/actions/filtroproduto.actions';
import { EditarCategoria } from '../../data/store/actions/categoria.actions';
import { CategoriaService } from '../../data/service';
import { TipoUsuario } from 'libs/data/src/lib/enums';
@Component({
  selector: 'personalizados-lopes-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fade]
})
export class HeaderComponent implements OnInit {
  user: entities.Usuario;
  @Select(SobreState.ObterSobre) Sobre$: Observable<Sobre>;
  @Select(SobreState.IsSobreLoaded) IsSobreLoaded$;
  IsSobreLoadedSub: Subscription;
  links = NavLinksRes;
  @Select(NavStateState.ObterNavState) NavState$: Observable<NavState>;
  @Select(ProdutoState.ObterListaProdutos) Produto$: Observable<Produto[]>;
  @Select(CategoriaState.ObterListaCategorias) Categoria$: Observable<Categoria[]>;
  route: string;
  search:boolean=false;
  search_desk:boolean=true;
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  carrinhoVazio:boolean = true;
  search_filter:string="";
  Categoria: entities.Categoria;
  Categorias: entities.Categoria[];
  defaultCategory = "Todos os produtos";
  TipoUsuario = TipoUsuario;
  galeria = {name:"Galeria",href:`/showcase`,queryParams:{}};
  constructor(
    private AuthenticationService:AuthenticationService,
    private location: Location, private router: Router,
    private ativatedRoute: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog,
    private ServicoCategoria: CategoriaService
    ) {

  }

  ngOnInit(): void {
    this.Carregar();
    this.router.events.subscribe(val => {
      if (this.location.path() != "") {
        this.route = this.location.path();
      } else {
        this.route = "inicio";
      }
      this.links.forEach(x=>{
        if(x.href == this.route.replace("/",''))
          this.SetActiveNav(x);
      })
    });
    this.Orcamento$.subscribe(x=>{
      if(x.Produto.length > 1)
        this.carrinhoVazio = false;
    });
    this.AuthenticationService.currentUser.subscribe(x=>this.user=x);
    this.CarregarCategorias();
  }

  CarregarCategorias(){
    this.ServicoCategoria.Ler().subscribe(x=>{this.Categorias = x;});
  }

  SelecionarCategoria($event){
    this.Categoria = this.Categorias.filter(cat => cat.Nome == $event.value)[0];
    this.store.dispatch(new EditarCategoriaFiltroProduto(this.Categoria)).subscribe();
  }

  abrir_procurar(){
    this.search = !this.search;
  }
  executar_pesquisa(){
    this.router.navigate(['/produtos',{queryParams:{nome:this.search_filter}}])
  }
  handleSearchValue($event){
    this.search_filter = $event;
  }

  openCheckout(){
    this.dialog.open(CheckoutDisplayComponent, {
      restoreFocus: false,
      width:'512px',
      height:'100vh',
      position:{
        right:'0'
      },
      panelClass:['no-padding','animate__animated','animate__slideInRight']
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
      console.log(value);
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
