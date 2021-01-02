import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef,  OnDestroy } from '@angular/core';
import { entities } from '@personalizados-lopes/data';

import { AuthenticationService } from '../../../core/service/authentication/authentication.service';
import { Router } from '@angular/router';
import { Link } from '../../../data/models';

@Component({
  selector: 'personalizados-lopes-gerenciamento',
  templateUrl: './gerenciamento.component.html',
  styleUrls: ['./gerenciamento.component.scss']
})
export class GerenciamentoComponent implements OnInit {
  mobileQuery: MediaQueryList;
  user: entities.Usuario;
  activenav:string = "Produtos";

  navs:Link[];

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

  Logout(){
    this.AuthenticationService.logout();
    this.router.navigateByUrl("/")
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.AuthenticationService.currentUser.subscribe(x=>this.user=x);

    this.navs = [
      {name: "Produtos", href: "."},
      {name: "Pedidos", href: "pedidos"},
      {name: "Usuarios Interessados", href: "emails"},
      {name: "Categorias de produtos", href: "categoria"},
      {name: "Depoimentos", href: "cliente"},
      {name: "Blog", href: "blog"},
      {name: "Sobre a empresa", href: "sobre"},
      {name: "Informações de contato", href: "informacaocontato"},
      {name: "Serviços da empresa", href: "servico"},
      {name: "Carrosel de imagens", href: "carrosel"},
      {name: "Mensagens Automaticas", href: "mensagem"},
      {name: "Imagens do site", href: "imagens"},
      {name: "Integrações", href: "integracoes"},
    ]
  }

}
