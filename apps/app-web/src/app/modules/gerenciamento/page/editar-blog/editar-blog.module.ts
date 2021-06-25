import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriarPostComponent } from './dialogs/criar-post/criar-post.component';
import { EditarPostComponent } from './dialogs/editar-post/editar-post.component';
import { EditarBlogComponent } from './editar-blog.component';
import { EdicaoCardBlogComponent } from './edicao-card-blog/edicao-card-blog.component';

@NgModule({
  declarations: [CriarPostComponent, EditarPostComponent, EditarBlogComponent, EdicaoCardBlogComponent],
  imports: [
    CommonModule
  ]
})
export class EditarBlogModule { }
