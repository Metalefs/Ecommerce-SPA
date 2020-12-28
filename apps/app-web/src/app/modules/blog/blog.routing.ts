import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './page/blog/blog.component';
import { ExibicaoBlogComponent } from './page/exibicao-blog/exibicao-blog.component';
import { ListagemPostsComponent } from './page/listagem-posts/listagem-posts.component';
export const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    data: { animation:'isLeft' },
    children: [
      {
        path: "",
        // canActivate: [AuthGuard],
        component: ListagemPostsComponent,
        data: { animation:'isLeft' },
      },
      {
        path: 'blog/:id',
        component: ExibicaoBlogComponent,
        pathMatch: 'full',
        // data: { animation:'isRight' }
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogPageRoutes {}
