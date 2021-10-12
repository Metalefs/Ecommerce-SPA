import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewProdutoComponent } from './preview-produto.component';


import { SlideshowModule } from 'ng-simple-slideshow';
import { VisualizacaoProdutoLojaModule } from '../../visualizacao-produto-loja/visualizacao-produto-loja.module';
import { MaterialModule } from '../../../material.module';

@NgModule({
  declarations: [PreviewProdutoComponent],
  imports: [
    CommonModule,
    VisualizacaoProdutoLojaModule,
    MaterialModule
  ],
  exports: [
    SlideshowModule
  ]
})
export class PreviewProdutoModule { }
