import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';

import { ExibicaoPrecoProdutoModule } from '../exibicao-preco-produto/exibicao-preco-produto.module';
import { CardEstampaComponent } from './card-estampa.component';

@NgModule({
  declarations: [CardEstampaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ExibicaoPrecoProdutoModule
  ],
  exports: [
    CardEstampaComponent,
  ]
})
export class CardEstampaModule { }
