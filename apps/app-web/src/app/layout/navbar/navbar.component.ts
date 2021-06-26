import { Component, Input, OnInit } from '@angular/core';

import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { entities } from '@personalizados-lopes/data';
import { SideNavState } from '../content-layout/page/content-layout.component';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoriaState, NavStateState } from '../../data/store/state';
import { NavState, GrupoNavLink, NavLink, NavLinks } from '../../shared/models/interfaces';
import { EditarNavState } from '../../data/store/actions/navstate.actions';
import { Categoria, Usuario } from 'libs/data/src/lib/classes';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../modules/login/page/login.component';
import { TipoUsuario } from 'libs/data/src/lib/enums';

@Component({
  selector: 'personalizados-lopes-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: entities.Usuario;
  collapsed=true;
  links = NavLinks;
  linksIntitucional:NavLink[];
  linksProdutos:NavLink[];
  linksDuvidas:NavLink[];
  linksOutros:NavLink[];
  usuario:Usuario;
  TipoUsuario = TipoUsuario;
  Logado:boolean;
  @Input()NavState:SideNavState;
  GrupoNavLink = GrupoNavLink;
  search_filter:string="";
  Copyright:string = "Personalizados Lopes"
  @Select(NavStateState.ObterNavState) NavState$: Observable<NavState>;
  @Select(CategoriaState.ObterListaCategorias) Categoria$: Observable<Categoria[]>;
  constructor(private AuthenticationService:AuthenticationService,
    private router: Router,
    private store: Store,
    public dialog: MatDialog) { }

  ToggleNav(delay:number){
    setTimeout(()=>{
      this.NavState.open = this.NavState.open ? false : true;
    },delay);
  }

  SetActiveNav(link:any){
    this.store.dispatch(new EditarNavState({activeNav:link.name}));
    this.NavState$.subscribe()
  }

  Login(){
    this.dialog.open(LoginComponent, {
      restoreFocus: false,
      width:'512px',
      panelClass:['no-padding','animate__animated','animate__bounceIn']

    });
  }

  Logout(){
    this.AuthenticationService.logout();
    this.router.navigateByUrl("/")
  }

  ngOnInit(): void {
    this.Categoria$.subscribe(cats=>{
      this.linksProdutos = this.links.filter(x=>x.group == GrupoNavLink.produtos)
      this.linksProdutos[0].options = [];
      cats.forEach(cat=>{
        this.linksProdutos[0].options.push({nome:cat.Nome,link:`/produtos`,queryParams:{categoria:cat.Nome}})
      })
    })
    this.linksIntitucional = this.links.filter(x=>x.group == GrupoNavLink.institucional)
    this.linksDuvidas = this.links.filter(x=>x.group == GrupoNavLink.duvidas)
    this.linksOutros = this.links.filter(x=>x.group == GrupoNavLink.none)
    this.AuthenticationService.currentUser.subscribe(x=>{
      this.usuario = x;
      this.Logado = x != undefined;
    })
  }

  executar_pesquisa(){
    this.router.navigate(['/produtos',{queryParams:{nome:this.search_filter}}])
  }
  handleSearchValue($event){
    this.search_filter = $event;
  }

}
