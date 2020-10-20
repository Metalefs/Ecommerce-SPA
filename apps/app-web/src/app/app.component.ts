import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import AOS from 'aos'

import { AppDeploymentState } from './data/enums/AppDeploymentState';

import { LerCategoria } from './data/store/actions/categoria.actions';
import { LerCliente } from './data/store/actions/Cliente.actions';
import { LerInformacoesContato } from './data/store/actions/informacoescontato.actions';
import { LerOrcamento } from './data/store/actions/Orcamento.actions';
import { LerMensagem } from './data/store/actions/Mensagem.actions';
import { LerProduto } from './data/store/actions/Produto.actions';
import { LerServico } from './data/store/actions/Servico.actions';
import { LerSobre } from './data/store/actions/sobre.actions';
@Component({
  selector: 'personalizados-lopes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'PersonalizadosLopes';
  AppDeploymentState = AppDeploymentState;
  DeployState: AppDeploymentState = AppDeploymentState.Deployed;

  constructor(private store: Store){  }

  LerServicosAPI(){
    this.store.dispatch(new LerInformacoesContato()).subscribe();
    this.store.dispatch(new LerCliente()           ).subscribe();
    this.store.dispatch(new LerSobre()             ).subscribe();
    this.store.dispatch(new LerServico()           ).subscribe();
    this.store.dispatch(new LerCategoria()         ).subscribe();
    this.store.dispatch(new LerProduto()           ).subscribe();
    this.store.dispatch(new LerMensagem()          ).subscribe();
  }

  ngOnInit(){
    AOS.init();
    this.LerServicosAPI();
  }
}
