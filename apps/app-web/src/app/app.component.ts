import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import AOS from 'aos'

import { AppDeploymentState } from './data/enums/AppDeploymentState';

import { LerCategoria } from './data/store/actions/categoria.actions';
import { LerCliente } from './data/store/actions/cliente.actions';
import { LerInformacoesContato } from './data/store/actions/informacoescontato.actions';
import { LerOrcamento } from './data/store/actions/orcamento.actions';
import { LerMensagem } from './data/store/actions/mensagem.actions';
import { LerServico } from './data/store/actions/servico.actions';
import { LerSobre } from './data/store/actions/sobre.actions';
import { LerItemCarousel } from './data/store/actions/item-carousel.actions';
import { LerCarousel } from './data/store/actions/carousel.actions';
import { IntegracoesService } from './data/service';
import { NgxSpinnerService } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
declare let gtag: Function;
declare let Mercadopago: any;
@Component({
  selector: 'personalizados-lopes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'PersonalizadosLopes';
  AppDeploymentState = AppDeploymentState;
  DeployState: AppDeploymentState = AppDeploymentState.Deployed;
  loading:boolean=true;
  carregandoOque:string='';
  @ViewChild('cookieLaw')
  private cookieLawEl: any;


  constructor(
    private store: Store,
    private router : Router,
    private integracoesService: IntegracoesService,
    private spinner: NgxSpinnerService,
    @Inject(PLATFORM_ID) private platform: Object

  ) {
    if(isPlatformBrowser(this.platform)){
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
  }

  LerServicosAPI(){
    this.store.dispatch(new LerCarousel()          ).subscribe(x=>this.carregandoOque = 'Obtendo imagens');
    this.store.dispatch(new LerOrcamento()         ).subscribe(x=>this.carregandoOque = '');
    this.store.dispatch(new LerItemCarousel()      ).subscribe(x=>this.carregandoOque = 'Obtendo imagens');
    this.store.dispatch(new LerInformacoesContato()).subscribe(x=>this.carregandoOque = '');
    this.store.dispatch(new LerCliente()           ).subscribe(
      x=>{
        this.spinner.hide();
        this.carregandoOque = 'Clientes carregados'
      }
    );
    this.store.dispatch(new LerSobre()             ).subscribe(x=>this.carregandoOque = 'Serviços carregados');
    this.store.dispatch(new LerServico()           ).subscribe();
    this.store.dispatch(new LerCategoria()         ).subscribe();
    this.store.dispatch(new LerMensagem()          ).subscribe();
  }

  ngOnInit(){
    AOS.init();
    if(isPlatformBrowser(this.platform)){
      this.spinner.show();
      this.LerServicosAPI();
      this.integracoesService.Ler().subscribe(x=>{
        Mercadopago.setPublishableKey(x.public_key);
      })

      // const element = document.createElement('link');
      // element.href = 'lazy-style.css';
      // element.rel = 'stylesheet';
      // document.body.appendChild(element);
    }
  }

  dismissCookieLaw(){
    this.cookieLawEl.dismiss();
  }

}
