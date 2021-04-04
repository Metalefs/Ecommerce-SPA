import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './page/inicio.component';

export const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    data: { animation:'isLeft', title: 'Inicio' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioPageRoutes {}
