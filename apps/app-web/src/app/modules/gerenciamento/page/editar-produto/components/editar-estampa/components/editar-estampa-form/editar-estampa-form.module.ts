import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaEstampaComponent } from './components/categoria-estampa/categoria-estampa.component';
import { ImagemEstampaComponent } from './components/imagem-estampa/imagem-estampa.component';
import { PrecoEstampaComponent } from './components/preco-estampa/preco-estampa.component';
import { DescricaoEstampaComponent } from './components/descricao-estampa/descricao-estampa.component';
import { PosicaoEstampaComponent } from './components/posicao-estampa/posicao-estampa.component';

import { EditarEstampaFormComponent } from './editar-estampa-form.component';

import { SharedModule } from '../../../../../../../../shared/shared.module';

@NgModule({
  declarations: [
    CategoriaEstampaComponent,
    ImagemEstampaComponent,
    PrecoEstampaComponent,
    DescricaoEstampaComponent,
    PosicaoEstampaComponent,
    EditarEstampaFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    CategoriaEstampaComponent,
    ImagemEstampaComponent,
    PrecoEstampaComponent,
    DescricaoEstampaComponent,
    PosicaoEstampaComponent,
    EditarEstampaFormComponent
  ]
})
export class EditarEstampaFormModule { }
