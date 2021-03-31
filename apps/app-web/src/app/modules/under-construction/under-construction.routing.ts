import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'apps/app-web/src/environments/environment';
import { UnderConstructionComponent } from './page/under-construction.component';


export const routes: Routes = [
  {
    path: 'construction',
    component: UnderConstructionComponent,
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export  class UnderConstructionPageRoutes { }
