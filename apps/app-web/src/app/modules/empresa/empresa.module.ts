import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './page/empresa.component';
import { EmpresaPageRoutes } from './empresa.routing';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [EmpresaComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmpresaPageRoutes
  ]
})
export class EmpresaModule { }
