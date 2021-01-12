import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowcaseComponent } from './page/showcase.component';

export const routes: Routes = [
  {
    path: 'showcase',
    component: ShowcaseComponent,
    pathMatch: 'full',
    data: { animation:'isRight' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowcasePageRoutes {}
