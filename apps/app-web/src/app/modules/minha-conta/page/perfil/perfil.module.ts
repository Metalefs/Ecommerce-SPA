import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './page/perfil.component';
import { SharedModule } from '../../../../shared/shared.module';
import { NovoEnderecoComponent } from './page/dialogs/novo-endereco/novo-endereco.component';
import { NovaSenhaComponent } from './page/dialogs/nova-senha/nova-senha.component';

@NgModule({
  declarations: [PerfilComponent, NovoEnderecoComponent, NovaSenhaComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PerfilModule { }
