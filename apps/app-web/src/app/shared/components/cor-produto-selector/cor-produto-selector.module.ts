import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CorProdutoSelectorComponent } from './cor-produto-selector.component';

@NgModule({
  declarations: [CorProdutoSelectorComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    CorProdutoSelectorComponent,
  ]
})
export class CorProdutoSelectorModule { }
