import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './page/perfil.component';
import { PerfilPageRoutes } from './perfil.routing';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    PerfilPageRoutes,
    SharedModule
  ]
})
export class PerfilModule { }
