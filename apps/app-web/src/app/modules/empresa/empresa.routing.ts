import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'apps/app-web/src/environments/environment';
import { EmpresaComponent } from './page/empresa.component';

export const routes: Routes = [
  {
    path: 'empresa',
    component: EmpresaComponent,
    pathMatch: 'full',
    data: { animation:'isRight' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaPageRoutes {}
