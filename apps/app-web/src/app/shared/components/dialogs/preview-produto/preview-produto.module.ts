import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewProdutoComponent } from './preview-produto.component';


import { SlideshowModule } from 'ng-simple-slideshow';
import { VisualizacaoProdutoLojaModule } from '../../visualizacao-produto-loja/visualizacao-produto-loja.module';

@NgModule({
  declarations: [PreviewProdutoComponent],
  imports: [
    CommonModule,
    VisualizacaoProdutoLojaModule
  ],
  exports: [
    SlideshowModule
  ]
})
export class PreviewProdutoModule { }
