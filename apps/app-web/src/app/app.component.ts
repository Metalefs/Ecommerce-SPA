import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngxs/store';
import AOS from 'aos';

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
import { LerProduto } from './data/store/actions/produto.actions';
import { IntegracoesService } from './data/service';
import { CookieLawComponent } from 'angular2-cookie-law';

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
  loading: boolean = true;
  carregandoOque: string = '';
  dismissed:boolean;
  @ViewChild('cookieLaw')
  cookieLawEl: CookieLawComponent;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private integracoesService: IntegracoesService,
    private spinner: NgxSpinnerService,
    @Inject(PLATFORM_ID) private platform: Object,
    private titleService: Title
  ) {
    const appTitle = this.titleService.getTitle();
    if (isPlatformBrowser(this.platform)) {
      this.router
        .events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            gtag('config', 'UA-175817845-1',
              {
                'page_path': event.urlAfterRedirects
              }
            );
          }
        });

      this.router
        .events.pipe(
          filter(event => event instanceof NavigationEnd),
          map(() => {
            let child = this.activatedRoute.firstChild;
            while (child.firstChild) {
              child = child.firstChild;
            }
            if (child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            }
            return appTitle;
          })
        ).subscribe((ttl: string) => {
          this.titleService.setTitle(ttl);
        });
    }
  }
  ngAfterViewInit(){
    this.cookieLawEl?.isSeen.subscribe(x=>this.dismissed = x);
  }

  LerServicosAPI() {
    this.store.dispatch(new LerCarousel()).subscribe(() => this.carregandoOque = 'Obtendo imagens');
    this.store.dispatch(new LerProduto()).subscribe(() => this.carregandoOque = 'Obtendo produtos');
    this.store.dispatch(new LerOrcamento()).subscribe(() => this.carregandoOque = '');
    this.store.dispatch(new LerItemCarousel()).subscribe(() => this.carregandoOque = 'Obtendo imagens');
    this.store.dispatch(new LerInformacoesContato()).subscribe(() => this.carregandoOque = '');
    this.store.dispatch(new LerCliente()).subscribe(
      () => {
        this.hideSpiner();
        this.carregandoOque = 'Carregando'
      }
    );
    this.store.dispatch(new LerSobre()).subscribe(x => this.carregandoOque = '');
    this.store.dispatch(new LerServico()).subscribe();
    this.store.dispatch(new LerCategoria()).subscribe();
    this.store.dispatch(new LerMensagem()).subscribe();
  }

  hideSpiner(){
    this.spinner.hide();
  }

  ngOnInit() {
    AOS.init();
    if (isPlatformBrowser(this.platform)) {
      this.spinner.show();
      this.LerServicosAPI();
      this.integracoesService.ObterChavePublicaMercadoPago().subscribe(public_key => {
        Mercadopago.setPublishableKey(public_key);
      })

      // const element = document.createElement('link');
      // element.href = 'lazy-style.css';
      // element.rel = 'stylesheet';
      // document.body.appendChild(element);
    }
  }

  dismissCookieLaw() {
    this.cookieLawEl.dismiss();

  }

}
