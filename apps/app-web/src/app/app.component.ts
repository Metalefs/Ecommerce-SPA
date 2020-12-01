import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import AOS from 'aos'

import { AppDeploymentState } from './data/enums/AppDeploymentState';

import { LerCategoria } from './data/store/actions/categoria.actions';
import { LerCliente } from './data/store/actions/cliente.actions';
import { LerInformacoesContato } from './data/store/actions/informacoescontato.actions';
import { LerOrcamento } from './data/store/actions/orcamento.actions';
import { LerMensagem } from './data/store/actions/mensagem.actions';
import { LerProduto } from './data/store/actions/produto.actions';
import { LerServico } from './data/store/actions/servico.actions';
import { LerSobre } from './data/store/actions/sobre.actions';
import { LerItemCarousel } from './data/store/actions/item-carousel.actions';
import { LerCarousel } from './data/store/actions/carousel.actions';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { AdicionarListaProdutosFiltroProduto } from './data/store/actions/filtroproduto.actions';
declare let gtag: Function;
@Component({
  selector: 'personalizados-lopes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'PersonalizadosLopes';
  AppDeploymentState = AppDeploymentState;
  DeployState: AppDeploymentState = AppDeploymentState.Deployed;

  constructor(
    private store: Store,
    private router: Router,
  ) {
      this.router.events.subscribe(event => {
         if(event instanceof NavigationEnd){
             gtag('config', 'UA-175817845-1',
                   {
                     'page_path': event.urlAfterRedirects
                   }
                  );
          }
       });
  }

  LerServicosAPI(){
    this.store.dispatch(new LerCarousel()          ).subscribe();
    this.store.dispatch(new LerOrcamento()         ).subscribe();
    this.store.dispatch(new LerItemCarousel()      ).subscribe();
    this.store.dispatch(new LerInformacoesContato()).subscribe();
    this.store.dispatch(new LerCliente()           ).subscribe();
    this.store.dispatch(new LerSobre()             ).subscribe();
    this.store.dispatch(new LerServico()           ).subscribe();
    this.store.dispatch(new LerCategoria()         ).subscribe();
    this.store.dispatch(new LerProduto()           ).subscribe(x=>{
      this.store.dispatch(new AdicionarListaProdutosFiltroProduto(x.Produtos.Produtos))
    });
    this.store.dispatch(new LerMensagem()          ).subscribe();
  }

  ngOnInit(){
    AOS.init();
    this.LerServicosAPI();
  }
}
