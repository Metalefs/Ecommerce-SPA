import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CheckoutComponent} from './page/checkout/checkout.component';
export const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    pathMatch: 'full',
    data: { animation:'isLeft' }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutPageRoutes {}
