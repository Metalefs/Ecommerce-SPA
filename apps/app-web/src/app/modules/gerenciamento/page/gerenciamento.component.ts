import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { entities } from '@personalizados-lopes/data';

import {AuthenticationService} from '../../../core/service/authentication/authentication.service';
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
  activenav:string;

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
      {name: "Orcamentos", href: "orcamento"},
      {name: "Usuarios interessados", href: "emails"},
      {name: "Categorias", href: "categoria"},
      {name: "Clientes", href: "cliente"},
      {name: "Sobre", href: "sobre"},
      {name: "Informações de contato", href: "informacaocontato"},
      {name: "Serviços", href: "servico"},
      {name: "Carrosel", href: "carrosel"},
      {name: "Mensagens Email", href: "mensagem"},
      {name: "Imagens", href: "imagens"},
    ]
  }

}
