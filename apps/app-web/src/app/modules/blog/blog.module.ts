import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '../../shared/shared.module';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogComponent } from './page/blog/blog.component';
import { ExibicaoBlogComponent } from './page/exibicao-blog/exibicao-blog.component';
import { BlogPageRoutes } from './blog.routing';
import { ListagemPostsComponent } from './page/listagem-posts/listagem-posts.component';
import { SidebarComponent } from './page/sidebar/sidebar.component';


@NgModule({
  declarations: [
    BlogComponent,
    ExibicaoBlogComponent,
    ListagemPostsComponent,
    SidebarComponent
  ],
  imports: [
    BlogPageRoutes,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class BlogModule { }
