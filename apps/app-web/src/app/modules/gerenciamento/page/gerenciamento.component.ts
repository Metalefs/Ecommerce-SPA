import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef,  OnDestroy } from '@angular/core';
import { entities } from '@personalizados-lopes/data';

import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { Router, RouterOutlet } from '@angular/router';
import { Link } from '../../../shared/models/interfaces';
import { fade, slider } from '../../../animations';

import * as moment from 'moment';

@Component({
  selector: 'personalizados-lopes-gerenciamento',
  templateUrl: './gerenciamento.component.html',
  styleUrls: ['./gerenciamento.component.scss'],

  animations: [slider,fade]
})
export class GerenciamentoComponent implements OnInit {
  user: entities.Usuario;
  activenav:string = "Dashboard";
  opened = true;
  navs:Link[];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private cdr: ChangeDetectorRef,
    media: MediaMatcher,
    private AuthenticationService:AuthenticationService,
     private router: Router) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => cdr.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
     }

  LerWindowSize(){
      return this.mobileQuery;
  }

  ultimoLogin(){
    return moment(this.user?.DataHoraAlteracao).calendar()
  }

  Logout(){
    this.AuthenticationService.logout();
    this.router.navigateByUrl("/")
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    moment.locale('pt-br')
    this.AuthenticationService.currentUser.subscribe(x=>this.user=x);

    this.navs = [
      {name: "Dashboard", href: "/gerenciamento/app"},
      {name: "Configurações", href: "configuracoes"},
      {name: "Produtos", href: "produtos"},
      {name: "Pedidos", href: "pedidos"},
      {name: "Assinantes", href: "emails"},
      {name: "Depoimentos", href: "cliente"},
      {name: "Noticias", href: "blog"},
      {name: "Imagens do site", href: "imagens"},
    ]
  }
  prepareRoute(outlet: RouterOutlet) {
    try{
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    catch(ex){

    }
  }
  togglenav(nav:any, state:boolean){
    this.activenav = nav.name;
    this.opened=false;
  }
}
