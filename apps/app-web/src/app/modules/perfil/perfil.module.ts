import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './page/perfil.component';
import { PerfilPageRoutes } from './perfil.routing';
import { SharedModule } from '../../shared/shared.module';
import { NovoEnderecoComponent } from './page/dialogs/novo-endereco/novo-endereco.component';



@NgModule({
  declarations: [PerfilComponent, NovoEnderecoComponent],
  imports: [
    CommonModule,
    PerfilPageRoutes,
    SharedModule
  ]
})
export class PerfilModule { }
