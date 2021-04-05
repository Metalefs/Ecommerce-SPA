import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

import { OrcamentoComponent } from './page/orcamento.component';
import { OrcamentoPageRoutes } from './orcamento.routing';
import { FormularioComponent } from './page/formulario/formulario.component';
import { TabelaProdutosComponent } from './page/tabela-produtos/tabela-produtos.component';
import { CardContatoComponent } from './page/card-contato/card-contato.component';

@NgModule({
  declarations: [OrcamentoComponent, FormularioComponent, TabelaProdutosComponent, CardContatoComponent],
  imports: [
    OrcamentoPageRoutes,
    CommonModule,
    SharedModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ]
})
export class OrcamentoModule { }
