import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './page/pagenotfound/pagenotfound.component';

export const routes: Routes = [
  {
    path: '',
    component: PagenotfoundComponent,
    pathMatch: 'full',
    data: { animation:'isLeft',title: 'Página não encontrada - 404' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagenotfoundPageRoutes {}
