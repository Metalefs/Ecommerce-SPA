import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ExibicaoPrecoProdutoComponent } from './exibicao-preco-produto.component';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

@NgModule({
  declarations: [ExibicaoPrecoProdutoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
  ],
  exports: [
    ExibicaoPrecoProdutoComponent,
  ]
})
export class ExibicaoPrecoProdutoModule { }
