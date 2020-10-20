import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoComponent } from './page/servico.component';
import { ServicoPageRoutes } from './servico.routing';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ServicoComponent],
  imports: [
    ServicoPageRoutes,
    SharedModule,
    CommonModule
  ]
})
export class ServicoModule { }
