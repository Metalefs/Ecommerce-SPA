import { Component, Input, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../../../core/service/authentication/authentication.service';
import { entities } from '@personalizados-lopes/data';
import { GrupoNavLink, NavLink, NavLinks } from '../../../../../data/models/navlinks';
import { SideNavState } from '../../../../../layout/content-layout/page/content-layout.component';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavStateState } from '../../../../../data/store/state';
import { Link, NavState } from '../../../../../data/models';
import { EditarNavState } from '../../../../../data/store/actions/navstate.actions';
import { Usuario } from 'libs/data/src/lib/classes';
import { MatDialog } from '@angular/material/dialog';
import { TipoUsuario } from 'libs/data/src/lib/enums';

@Component({
  selector: 'personalizados-lopes-minha-conta-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user: entities.Usuario;
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
  @Select(NavStateState.ObterNavState) NavState$: Observable<NavState>;
  constructor(private AuthenticationService:AuthenticationService,
    private router: Router,
    private store: Store,
    public dialog: MatDialog) { }

  ToggleNav(delay:number){
    setTimeout(()=>{
      this.NavState.open = this.NavState.open ? false : true;
    },delay);
  }

  SetActiveNav(link:Link){
    this.store.dispatch(new EditarNavState({activeNav:link.name}));
    this.NavState$.subscribe()
  }

  ngOnInit(): void {
    // this.links = [
    //   {name: "Meu Cadastro", href: "perfil"},
    //   {name: "Pedidos", href: "pedidos"},
    // ]
    this.linksIntitucional = this.links.filter(x=>x.group == GrupoNavLink.institucional)
    this.linksProdutos = this.links.filter(x=>x.group == GrupoNavLink.produtos)
    this.linksDuvidas = this.links.filter(x=>x.group == GrupoNavLink.duvidas)
    this.linksOutros = this.links.filter(x=>x.group == GrupoNavLink.none)
    this.AuthenticationService.currentUser.subscribe(x=>{
      this.usuario = x;
      this.Logado = x != undefined;
    })
  }

}
