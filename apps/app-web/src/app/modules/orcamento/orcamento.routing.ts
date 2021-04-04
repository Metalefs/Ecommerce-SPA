import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrcamentoComponent } from './page/orcamento.component';

export const routes: Routes = [
  {
    path: '',
    component: OrcamentoComponent,
    pathMatch: 'full',
    data: { animation:'isLeft', title: 'Orçamentos' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrcamentoPageRoutes {}
