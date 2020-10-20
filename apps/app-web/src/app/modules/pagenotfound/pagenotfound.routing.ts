import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './page/pagenotfound/pagenotfound.component';

export const routes: Routes = [
  {
    path: 'pagenotfound',
    component: PagenotfoundComponent,
    pathMatch: 'full',
    data: { animation:'isLeft' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagenotfoundPageRoutes {}
