import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicoComponent } from './page/servico.component';

export const routes: Routes = [
  {
    path: '',
    component: ServicoComponent,
    pathMatch: 'full',
    data: { animation:'isLeft' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoPageRoutes {}
