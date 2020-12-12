import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/interceptor';
import { PerfilComponent } from './page/perfil.component';
export const routes: Routes = [
  {
    path: 'perfil',
    component: PerfilComponent,
    data: { animation:'isLeft' },
    canActivate: [AuthGuard]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilPageRoutes {}
