import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './page/inicio.component';

export const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
    pathMatch: 'full',
    // data: { animation:'isLeft' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioPageRoutes {}
